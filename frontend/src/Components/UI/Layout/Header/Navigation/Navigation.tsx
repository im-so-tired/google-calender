import cn from 'classnames'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { getGenitiveMonth } from '@/utils/date/genitiveMonth'

import styles from './Navigation.module.scss'
import { useNavigate } from './useNavigate'
import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'

const Navigation: FC = () => {
	const { nextDay, previousDay, getDate } = useNavigate()
	
	return (
		<nav className={styles.navigation}>
			<Link to="/">
				<button className={cn('navBtn', styles.todayBtn)}>Сегодня</button>
			</Link>
			<Link to={previousDay()}>
				<CircleBtn icon="MdArrowBackIosNew" size={32} iconSize={18} />
			</Link>
			<Link to={nextDay()}>
				<CircleBtn icon="MdArrowForwardIos" size={32} iconSize={18} />
			</Link>
			<h2 className={styles.selectedDate}>{getDate()}</h2>
		</nav>
	)
}

export default Navigation
