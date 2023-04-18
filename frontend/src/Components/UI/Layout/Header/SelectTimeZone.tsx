import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SingleValue } from 'react-select'

import { useGetTimeZone } from '@/hooks/useGetTimeZone'

import { IOption } from '@/shared/types/SelectOpt'
import { ITimeZone } from '@/shared/types/timeZone'

import { typeTableOptions } from '@/utils/constants'

import pickedDate from '@/store/PickedDate'

import styles from '../Layout.module.scss'

import CustomSelect from '@/common/Select/CustomSelect'

const SelectTimeZone: FC = observer(() => {
	const [value, setValue] = useState(typeTableOptions[0].value)
	const { timeZone } = pickedDate
	const handleChange = (newOption: SingleValue<IOption<ITimeZone>>) => {
		const newValue = (newOption as IOption<ITimeZone>).value
		pickedDate.setTimeZone(newValue)
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
})

export default SelectTimeZone
