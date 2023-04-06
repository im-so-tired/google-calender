import React, { FC } from 'react'
import Select, { SingleValue } from 'react-select'

import { IOption } from '@/shared/types/SelectOpt'

import './CustomSelect.scss'

interface ICustomSelectProps {
	value: string | number
	onChange: (newValue: SingleValue<IOption<any>>) => void
	options: IOption<any>[]
	classNamePrefix: string
	isSearchable?: boolean
	className?: string
}

const CustomSelect: FC<ICustomSelectProps> = ({ value, options, ...rest }) => {
	const getValue = () => {
		return options.find(opt => opt.value === value) || options[0]
	}
	return <Select value={getValue()} options={options} {...rest} />
}

export default CustomSelect
