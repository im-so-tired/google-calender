import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SingleValue } from 'react-select'

import { useGetTimeZone } from '@/hooks/useGetTimeZone'

import { IOption } from '@/shared/types/SelectOpt'

import { typeTableOptions } from '@/utils/constants'

import styles from '../Layout.module.scss'

import CustomSelect from '@/common/Select/CustomSelect'

const SelectTimeZone: FC = () => {
	const [value, setValue] = useState(typeTableOptions[0].value)

	const navigate = useNavigate()
	const { pathname } = useLocation()
	const timeZone = useGetTimeZone()

	const handleChange = (newOption: SingleValue<IOption<string>>) => {
		const newValue = (newOption as IOption<string>).value
		navigate(pathname.replace(timeZone, newValue))
		setValue(newValue)
	}

	useEffect(() => {
		setValue(timeZone)
	}, [timeZone])

	return (
		<CustomSelect
			value={value}
			classNamePrefix="custom-select"
			onChange={handleChange}
			options={typeTableOptions}
			className={styles.select}
		/>
	)
}

export default SelectTimeZone
