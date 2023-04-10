import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import { useCreateModalContext } from '@/common/Modals/CreateModal/useModalContext'

const Description: FC = () => {
	const { control } = useCreateModalContext()

	return (
		<Controller
			name="description"
			control={control}
			render={({ field }) => (
				<textarea
					className="modalTextField"
					value={field.value}
					onChange={field.onChange}
					rows={1}
					placeholder="Add description"
				/>
			)}
		/>
	)
}

export default Description
