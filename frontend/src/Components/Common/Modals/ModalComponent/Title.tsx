import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import ModalInput from '@/common/Inputs/ModalInput/ModalInput'
import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'

const Title: FC = () => {
	const { control } = useCreateModalContext()
	return (
		<Controller
			control={control}
			name="title"
			rules={{ required: 'Title is required field!' }}
			render={({ field, formState: { errors } }) => (
				<ModalInput
					value={field.value}
					onChange={field.onChange}
					error={errors.title}
					className="titleInput"
					placeholder="Add title"
				/>
			)}
		></Controller>
	)
}

export default Title
