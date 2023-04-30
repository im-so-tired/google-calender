import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import modals from '@store/Modals'
import user from '@store/User'

import FormInput from '@common/Inputs/FormInput/FormInput'
import BaseModal, { IBaseModal } from '@common/Modals/BaseModal/BaseModal'
import { ILoginFields } from '@common/Modals/Login/Login.interface'
import styles from './Login.module.scss'

interface ILoginModal extends IBaseModal {
}

const LoginModal: FC<ILoginModal> = props => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ILoginFields>({ mode: 'onChange' })
	const [wrongEmail, setWrongEmail] = useState<string | null>(null)
	const [wrongPassword, setWrongPassword] = useState<string | null>(null)
	const onSubmit: SubmitHandler<ILoginFields> = async data => {
		const errorMes = await user.login(data)
		if (errorMes) {
			if (errorMes === 'User not found') setWrongEmail(errorMes)
			else setWrongEmail(null)
			if (errorMes === 'Wrong password') setWrongPassword(errorMes)
		} else {
			setWrongEmail(null)
			setWrongPassword(null)
			modals.toggleLoginModal()
			reset()
		}
	}
	return (
		<BaseModal bgDark {...props}>
			<div className={styles.wrapper}>
				<header className={styles.header}>
					<h3>Welcome back</h3>
					<p>Login to your account now</p>
				</header>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
						error={errors.password?.message || wrongPassword}
					/>
					<button className={styles.submitBtn} type='submit'>
						Login In
					</button>
				</form>
			</div>
		</BaseModal>
	)
}

export default LoginModal
