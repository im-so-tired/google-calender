import { ChangeEvent, FC, useRef } from 'react'

import styles from './FileInput.module.scss'

interface IFileInput {
	label: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	alt: string
	src: string
}

const FileInput: FC<IFileInput> = ({ label, onChange, alt, src }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const handleClick = () => {
		inputRef.current?.click()
	}
	return (
		<label htmlFor={label} className={styles.formInput}>
			{label}
			<input
				type="file"
				accept="image/*, .png, .jpg, .gif"
				onChange={onChange}
				ref={inputRef}
			/>
			<img alt={alt} src={src} width={80} height={80} onClick={handleClick} />
		</label>
	)
}

export default FileInput
