import cn from 'classnames'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import { IconTypes } from '@/shared/types/IconTypes'

import { defaultIconSize } from '@/utils/constants'

import styles from './CircleBtn.module.scss'
import Icon from '@/common/Icon'

interface CircleBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: IconTypes
	size?: number
	iconSize?: number
	bgColor?: 'light' | 'gray'
}

const CircleBtn: FC<PropsWithChildren<CircleBtnProps>> = ({
	icon,
	size,
	iconSize = defaultIconSize,
	bgColor = 'light',
}) => {
	const buttonStyle = size ? { width: size, height: size } : {}
	return (
		<button
			className={cn(styles.circleBtn, {
				[styles.bgHoverDark]: bgColor === 'gray',
			})}
			style={buttonStyle}
		>
			<Icon name={icon} size={iconSize} />
		</button>
	)
}

export default CircleBtn
