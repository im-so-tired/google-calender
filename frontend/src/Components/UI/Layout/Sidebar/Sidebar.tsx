import { FC } from 'react'

import styles from '../Layout.module.scss'

import DatePicker from './DatePicker'

const Sidebar: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.emptyDiv}></div>
			<DatePicker />
		</aside>
	)
}

export default Sidebar
