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

	const handleChange = (newOption: SingleValue<IOption>) => {
		setValue((newOption as IOption).value)
	}

	useEffect(() => {
		navigate(pathname.replace(timeZone, value))
	}, [value, navigate, pathname, timeZone])

	return (
		<CustomSelect
			value={value}
			onChange={handleChange}
			options={typeTableOptions}
			className={styles.select}
		/>
	)
}

export default SelectTimeZone
