import cn from 'classnames'
import moment from 'moment'
import React, { FC } from 'react'

import SelectedDate from '@ui/Layout/Header/Navigation/SelectedDate'

import pickedDate from '@store/PickedDate'

import CircleBtn from '@common/Buttons/CircleBtn/CircleBtn'
import styles from './Navigation.module.scss'

const Navigation: FC = () => {
	return (
		<nav className={styles.navigation}>
			<button
				onClick={() => pickedDate.setDate(moment().locale('EN'))}
				className={cn('navBtn', styles.todayBtn)}
			>
				Today
			</button>
			<CircleBtn
				onClick={() => pickedDate.prev()}
				icon='MdArrowBackIosNew'
				size={32}
				iconSize={18}
			/>
			<CircleBtn
				onClick={() => pickedDate.next()}
				icon='MdArrowForwardIos'
				size={32}
				iconSize={18}
			/>
			<SelectedDate />
		</nav>
	)
}

export default Navigation
