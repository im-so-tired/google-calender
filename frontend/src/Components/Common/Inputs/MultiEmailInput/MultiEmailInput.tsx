import cn from 'classnames'
import React, { FC, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import styles from './MultiEmailInput.module.scss'

interface MultiEmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
	error: FieldError
}

const MultiEmailInput: FC<MultiEmailInputProps> = ({
	error,
	className,
	...rest
}) => {
	return (
		<div className={styles.multiEmail}>
			<input className={cn(className, { [styles.error]: error })} {...rest} />
			{error ? <span>{error.message}</span> : null}
		</div>
	)
}

export default MultiEmailInput
