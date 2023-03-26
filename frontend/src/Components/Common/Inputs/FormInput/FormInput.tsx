import React, { FC } from 'react'

interface IFormInput {
	register: any
	label: string
	error: string | undefined
}

const FormInput: FC<IFormInput> = ({ label, error, register }) => {
	return (
		<label htmlFor={label}>
			{label}
			<input {...register} id={label} />
			{error && <span>{error}</span>}
		</label>
	)
}

export default FormInput
