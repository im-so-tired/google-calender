import cn from 'classnames'
import React, { FC } from 'react'
import { Link, useHref, useLocation, useParams } from 'react-router-dom'

import { useGetTimeZone } from '@/hooks/useGetTimeZone'

import { getGenitiveMonth } from '@/utils/date/genitiveMonth'

import styles from './Navigation.module.scss'
import { useNavigate } from './useNavigate'
import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'

const Navigation: FC = () => {
	const { day, month, year } = useParams()
	useNavigate()
	const timeZone = useGetTimeZone()
	return (
		<nav className={styles.navigation}>
			<Link to="/">
				<button className={cn('navBtn', styles.todayBtn)}>Сегодня</button>
			</Link>
			<Link to={`${timeZone}/${year}/${month}/${Number(day) - 1}`}>
				<CircleBtn icon="MdArrowBackIosNew" size={32} iconSize={18} />
			</Link>
			<Link to={`${timeZone}/${year}/${month}/${Number(day) + 1}`}>
				<CircleBtn icon="MdArrowForwardIos" size={32} iconSize={18} />
			</Link>
			<h2 className={styles.selectedDate}>
				{`${day} ${getGenitiveMonth(Number(month))} ${year}`}
			</h2>
		</nav>
	)
}

export default Navigation
