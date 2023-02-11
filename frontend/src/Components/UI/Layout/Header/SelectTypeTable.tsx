import { FC, useState } from 'react'
import { SingleValue } from 'react-select'

import { IOption } from '@/shared/types/SelectOpt'

import { typeTableOptions } from '@/utils/constants'

import styles from '../Layout.module.scss'

import CustomSelect from '@/common/Select/CustomSelect'

const SelectTypeTable: FC = () => {
	const [value, setValue] = useState(typeTableOptions[0].value)

	const handleChange = (newOption: SingleValue<IOption>) => {
		setValue((newOption as IOption).value)
	}

	return (
		<CustomSelect
			value={value}
			onChange={handleChange}
			options={typeTableOptions}
			className={styles.select}
		/>
	)
}

export default SelectTypeTable
