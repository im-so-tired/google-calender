import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

const Description: FC<{ control: Control<any, any>; row: number }> = ({
	control,
	row,
}) => {
	return (
		<Controller
			name="description"
			control={control}
			render={({ field }) => (
				<textarea
					className="modalTextField"
					value={field.value}
					onChange={field.onChange}
					rows={row}
					placeholder="Add description"
				/>
			)}
		/>
	)
}

export default Description
