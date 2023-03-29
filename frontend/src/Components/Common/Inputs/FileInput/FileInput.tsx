import React, { FC } from 'react'

import defaultAvatar from '@/assets/images/default-avatar.png'

import styles from '@/common/Inputs/FormInput/FormInput.module.scss'

interface IFileInput {
	register: any
	label: string
	onChange: () => void
	alt: string
	src: string
}

const FileInput: FC<IFileInput> = ({ label, register, onChange, alt, src }) => {
	return (
		<label htmlFor={label} className={styles.formInput}>
			{label}
			<input
				type="file"
				{...register('avatar')}
				accept="image/*, .png, .jpg, .gif"
				onChange={onChange}
			/>
			<img alt={alt} src={src} width={80} height={80} />
		</label>
	)
}

export default FileInput
