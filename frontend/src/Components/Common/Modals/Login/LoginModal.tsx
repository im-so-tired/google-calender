import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import FormInput from '@/common/Inputs/FormInput/FormInput'
import BaseModal, { IBaseModal } from '@/common/Modals/BaseModal'
import { ILoginFields } from '@/common/Modals/Login/Login.interface'

interface ILoginModal extends IBaseModal {}

const LoginModal: FC<ILoginModal> = props => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFields>({ mode: 'onChange' })
	const onSubmit: SubmitHandler<ILoginFields> = data => console.log(data)
	return (
		<BaseModal {...props}>
			<header>
				<h3>Get started</h3>
				<p>Create your account now</p>
			</header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					register={{
						...register('email', { required: 'Email is required field!' }),
					}}
					label="Email"
					error={errors.email?.message}
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
				<button type="submit">Save</button>
			</form>
		</BaseModal>
	)
}

export default LoginModal
