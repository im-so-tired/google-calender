import React, { FC } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

import MultiEmailInput from '@/common/Inputs/MultiEmailInput/MultiEmailInput'

const Guests: FC<{ control: Control<any, any> }> = ({ control }) => {
	return (
		<Controller
			render={({ field, formState: { errors } }) => (
				<MultiEmailInput
					value={field.value}
					onChange={field.onChange}
					error={errors.guests as FieldError}
					className="modalTextField"
					placeholder="Add guests"
					style={{ width: '100%', boxSizing: 'border-box' }}
				/>
			)}
			name="guests"
			control={control}
			rules={{
				pattern: {
					value:
						/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^([\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,},\s*)*[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
					message: 'Invalid email address',
				},
			}}
		/>
	)
}

export default Guests
