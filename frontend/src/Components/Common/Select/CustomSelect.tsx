import React, { FC } from 'react'
import Select, { SingleValue } from 'react-select'

import { IOption } from '@/shared/types/SelectOpt'

import './CustomSelect.scss'

interface ICustomSelectProps {
	value: string
	onChange: (newValue: SingleValue<IOption>) => void
	options: IOption[]
	isSearchable?: boolean
	className?: string
}

const CustomSelect: FC<ICustomSelectProps> = ({ value, options, ...rest }) => {
	const getValue = () => {
		return options.find(opt => opt.value === value) || options[0]
	}
	return (
		<Select
			value={getValue()}
			classNamePrefix="custom-select"
			options={options}
			{...rest}
		/>
	)
}

export default CustomSelect
