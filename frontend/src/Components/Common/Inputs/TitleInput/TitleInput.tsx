import { FC, InputHTMLAttributes } from 'react'

import styles from './TitleInput.module.scss'

const TitleInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
	...props
}) => {
	return (
		<input className={styles.titleInput} {...props} placeholder="Add title" />
	)
}

export default TitleInput
