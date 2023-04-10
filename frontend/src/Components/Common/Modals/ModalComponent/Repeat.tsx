import { FC } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

import { repeatOption } from '@/shared/constants/repeatOption'

import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'
import '@/common/Select/CustomSelect.scss'

const Repeat: FC = () => {
	const { control } = useCreateModalContext()

	return (
		<Controller
			name="repeat"
			control={control}
			render={({ field }) => (
				<Select
					value={field.value}
					onChange={field.onChange}
					name="repeat"
					options={repeatOption}
					classNamePrefix="primary-select"
					defaultValue={repeatOption[0]}
				/>
			)}
		/>
	)
}

export default Repeat
