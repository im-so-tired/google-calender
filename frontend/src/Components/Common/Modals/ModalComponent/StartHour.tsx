import moment from 'moment/moment'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

import { startTimeOption } from '@/common/Modals/CreateModal/Helpers/createOptions'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'

const StartHour: FC = () => {
	const { control } = useCreateModalContext()

	return (
		<Controller
			name="startHour"
			control={control}
			render={({ field }) => (
				<Select
					value={field.value}
					onChange={field.onChange}
					name="startHour"
					options={startTimeOption}
					classNamePrefix="primary-select"
					defaultValue={startTimeOption.find(
						op => op.value === moment().hour()
					)}
				/>
			)}
		/>
	)
}

export default StartHour
