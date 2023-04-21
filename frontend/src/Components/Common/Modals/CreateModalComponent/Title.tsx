import React, { FC } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

import ModalInput from '@/common/Inputs/ModalInput/ModalInput'

const Title: FC<{ control: Control<any, any> }> = ({ control }) => {
	return (
		<Controller
			control={control}
			name="title"
			rules={{ required: 'Title is required field!' }}
			render={({ field, formState: { errors } }) => (
				<ModalInput
					value={field.value}
					onChange={field.onChange}
					error={errors.title as FieldError}
					className="titleInput"
					placeholder="Add title"
				/>
			)}
		/>
	)
}

export default Title
