import { FC } from 'react'

import { getCurrentDate } from '@utils/date/getCurrentDate'
import LogoImg from '@assets/logo.png'


import styles from '../Layout.module.scss'

const Logo: FC = () => {
	const { day } = getCurrentDate()
	return (
		<div className={styles.logo}>
			<div>
				<img alt='logo' src={LogoImg} />
				<span className={styles.currentDay}>{day}</span>
			</div>
			<h1 className='text-large'>Calendar</h1>
		</div>
	)
}

export default Logo
