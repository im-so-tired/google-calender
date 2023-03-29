import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import defaultAvatar from '@/assets/images/default-avatar.png'

import modals from '@/store/Modals'
import user from '@/store/User'

import styles from './Login.module.scss'
import FormInput from '@/common/Inputs/FormInput/FormInput'
import BaseModal, { IBaseModal } from '@/common/Modals/BaseModal'
import { IRegisterFields } from '@/common/Modals/Login/Login.interface'

interface ILoginModal extends IBaseModal {}

const LoginModal: FC<ILoginModal> = props => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IRegisterFields>({ mode: 'onChange' })
	const [wrongEmail, setWrongEmail] = useState<string | null>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const onSubmit: SubmitHandler<IRegisterFields> = async data => {
		console.log(data)
		// const errorMes = await user.login(data)
		// if (errorMes) {
		// 	setWrongEmail(errorMes)
		// } else {
		// 	setWrongEmail(null)
		// 	modals.toggleRegisterModal()
		// 	reset()
		// }
	}
	return (
		<BaseModal bgDark {...props}>
			<div className={styles.wrapper}>
				<header className={styles.header}>
					<h3>Get started</h3>
					<p>Create your account now</p>
				</header>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<input
						type="file"
						{...register('avatar')}
						accept="image/*, .png, .jpg, .gif"
						onChange={e => setSelectedFile(e.target.files && e.target.files[0])}
					/>
					<img
						alt="avatar"
						src={
							selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar
						}
						width={80}
						height={80}
					/>

					<FormInput
						register={{
							...register('name', { required: 'Name is required field!' }),
						}}
						label="Name"
						error={errors.name?.message}
					/>
					<FormInput
						register={{
							...register('email', { required: 'Email is required field!' }),
						}}
						label="Email"
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
						label="Password"
						error={errors.password?.message}
					/>
					<button className={styles.submitBtn} type="submit">
						Login In
					</button>
				</form>
			</div>
		</BaseModal>
	)
}

export default LoginModal
