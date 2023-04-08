import React, { FC, InputHTMLAttributes } from 'react'

import styles from './MultiEmailInput.module.scss'

interface MultiEmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid: boolean
	changeValid: (value: boolean) => void
}

const MultiEmailInput: FC<MultiEmailInputProps> = ({
	isValid,
	changeValid,
	...rest
}) => {
	return (
		<div className={styles.multiEmail}>
			<input {...rest} className={!isValid ? styles.error : ''} />
			{!isValid ? <span>Invalid email address</span> : null}
		</div>
	)
}

export default MultiEmailInput
