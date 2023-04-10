import moment from 'moment/moment'
import React, { FC, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

import {
	endTimeOption,
	startTimeOption,
} from '@/common/Modals/CreateModal/Helpers/createOptions'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'

const EndHour: FC = () => {
	const { watch, setValue, control } = useCreateModalContext()
	const defaultValue = endTimeOption.find(
		op => op.value === moment().hour() + 1
	)
	useEffect(() => {
		const subscription = watch(
			({ endHour, startHour }) => {
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
