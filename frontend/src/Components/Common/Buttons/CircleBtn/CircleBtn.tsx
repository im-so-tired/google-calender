import cn from 'classnames'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import { IconTypes } from '@shared/types/IconTypes'

import { defaultIconSize } from '@utils/constants'

import Icon from '@common/Icon'
import styles from './CircleBtn.module.scss'

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
	                                                          className,
	                                                          ...rest
                                                          }) => {
	const buttonStyle = size ? { width: size, height: size } : {}
	return (
		<button
			{...rest}
			className={cn(className, styles.circleBtn, {
				[styles.bgHoverDark]: bgColor === 'gray',
			})}
			style={buttonStyle}
		>
			<Icon name={icon} size={iconSize} color='#5f6368' />
		</button>
	)
}

export default CircleBtn
