import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Select from 'react-select'

import { repeatOption } from '@shared/constants/repeatOption'

import '@common/Select/CustomSelect.scss'

const Repeat: FC<{ control: Control<any, any> }> = ({ control }) => {
	return (
		<Controller
			name='repeat'
			control={control}
			render={({ field }) => (
				<Select
					value={field.value}
					onChange={field.onChange}
					name='repeat'
					options={repeatOption}
					classNamePrefix='primary-select'
					defaultValue={repeatOption[0]}
				/>
			)}
		/>
	)
}

export default Repeat
