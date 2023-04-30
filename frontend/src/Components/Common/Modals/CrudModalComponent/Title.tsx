import React, { FC } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

import ModalInput from '@common/Inputs/ModalInput/ModalInput'


const Title: FC<{ control: Control<any> }> = ({ control }) => {
	return (
		<Controller
			control={control}
			name='title'
			render={({ field, formState: { errors } }) => (
				<ModalInput
					value={field.value}
					onChange={field.onChange}
					error={errors.title as FieldError}
					className='titleInput'
					placeholder='Add title'
				/>
			)}
			rules={{ required: 'Title is required field!' }}
		/>
	)
}

export default Title
