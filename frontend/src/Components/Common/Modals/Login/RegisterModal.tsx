import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'


import modals from '@store/Modals'
import user from '@store/User'

import FileInput from '@common/Inputs/FileInput/FileInput'
import FormInput from '@common/Inputs/FormInput/FormInput'
import BaseModal, { IBaseModal } from '@common/Modals/BaseModal/BaseModal'
import { IRegisterFields } from '@common/Modals/Login/Login.interface'
import defaultAvatar from '@assets/images/default-avatar.png'
import styles from './Login.module.scss'

interface ILoginModal extends IBaseModal {
}

const RegisterModal: FC<ILoginModal> = props => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IRegisterFields>({ mode: 'onChange' })
	const [wrongEmail, setWrongEmail] = useState<string | null>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const onSubmit: SubmitHandler<IRegisterFields> = async textData => {
		const data = {
			...textData,
			avatar: selectedFile,
		}
		const formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (value) formData.append(key, value)
		}
		const errorMes = await user.register(formData)
		if (errorMes) {
			setWrongEmail(errorMes)
		} else {
			setWrongEmail(null)
			modals.toggleRegisterModal()
			reset()
		}
	}
	return (
		<BaseModal bgDark {...props}>
			<div className={styles.wrapper}>
				<header className={styles.header} style={{ marginBottom: 0 }}>
					<h3>Get started</h3>
					<p>Create your account now</p>
				</header>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<FileInput
						label='Avatar'
						onChange={e => setSelectedFile(e.target.files && e.target.files[0])}
						alt='avatar'
						src={
							selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar
						}
					/>
					<FormInput
						register={{
							...register('name', { required: 'Name is required field!' }),
						}}
						label='Name'
						error={errors.name?.message}
					/>
					<FormInput
						register={{
							...register('email', { required: 'Email is required field!' }),
						}}
						label='Email'
						error={errors.email?.message || wrongEmail}
					/>
					<FormInput
						register={{
							...register('password', {
								required: 'Password is required field!',
								minLength: {
									value: 6,
									message: 'Password length must be more than 5 characters!',
								},
							}),
						}}
						label='Password'
						error={errors.password?.message}
					/>
					<button className={styles.submitBtn} type='submit'>
						Sign up
					</button>
				</form>
			</div>
		</BaseModal>
	)
}

export default RegisterModal
