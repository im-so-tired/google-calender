import moment from 'moment/moment'
import React, { FC, useEffect } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'

import { IOption } from '@/shared/types/SelectOpt'

import {
	endTimeOption,
	startTimeOption,
} from '@/common/Modals/Helpers/createOptions'

interface ITimeOption {
	endHour: IOption<number>
	startHour: IOption<number>
}

const EndHour: FC<{
	control: Control<any, any>
	setValue: any
	watch: any
}> = ({ control, watch, setValue }) => {
	const defaultValue = endTimeOption.find(
		op => op.value === moment().hour() + 1
	)
	useEffect(() => {
		const subscription = watch(
			({ endHour, startHour }: ITimeOption) => {
				if (!startHour?.value || !endHour?.value) return

				if (startHour.value >= endHour.value) {
					setValue(
						'endHour',
						endTimeOption.find(op => op.value === startHour.value! + 1)!
					)
				}
			},
			{
				endHour: defaultValue,
				startHour: startTimeOption.find(op => op.value === moment().hour()),
			}
		)

		return () => {
			subscription.unsubscribe()
		}
	}, [defaultValue, setValue, watch])
	return (
		<Controller
			name="endHour"
			control={control}
			render={({ field }) => (
				<Select
					value={field.value}
					onChange={field.onChange}
					name="endHour"
					options={endTimeOption}
					classNamePrefix="primary-select"
					defaultValue={defaultValue}
				/>
			)}
		/>
	)
}

export default EndHour
