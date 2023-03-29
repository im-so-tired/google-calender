import React, { FC } from 'react'

import styles from './FormInput.module.scss'

interface IFormInput {
	register: any
	label: string
	error: string | null | undefined
}

const FormInput: FC<IFormInput> = ({ label, error, register }) => {
	return (
		<label htmlFor={label} className={styles.formInput}>
			{label}
			<input
				className={error ? styles.borderError : ''}
				{...register}
				id={label}
			/>
			{error && <span className={styles.error}>{error}</span>}
		</label>
	)
}

export default FormInput
