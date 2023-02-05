import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import { IconTypes } from '@/shared/types/IconTypes'

import styles from './CircleBtn.module.scss'
import Icon from '@/common/Icon'

interface CircleBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: IconTypes
	size: number
}

const CircleBtn: FC<PropsWithChildren<CircleBtnProps>> = ({ icon, size }) => {
	return (
		<button className={styles.circleBtn} style={{ width: size, height: size }}>
			<Icon name={icon} />
		</button>
	)
}

export default CircleBtn
