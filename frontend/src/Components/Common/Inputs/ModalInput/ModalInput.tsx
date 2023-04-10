import cn from 'classnames'
import React, { FC, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import styles from './ModalInput.module.scss'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
	error?: FieldError | undefined
	register?: any
	className?: string
}

const ModalInput: FC<IFormInput> = ({
	error,
	register,
	className,
	...rest
}) => {
	return (
		<div style={{ position: 'relative' }}>
			<input
				{...register}
				className={cn(className, { [styles.inputError]: error })}
				{...rest}
			/>
			{error && <span className={styles.error}>{error.message}</span>}
		</div>
	)
}

export default ModalInput
