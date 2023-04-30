import cn from 'classnames'
import React, { FC } from 'react'

import { useLayoutContext } from '@ui/Layout/useLayoutContext'

import CircleBtn from '@common/Buttons/CircleBtn/CircleBtn'
import styles from '../Layout.module.scss'


const ShowSidebarBtn: FC = () => {
	const { showSidebar, toggleSidebar } = useLayoutContext()
	return (
		<CircleBtn
			onClick={toggleSidebar}
			bgColor='gray'
			size={48}
			iconSize={24}
			icon='MdDehaze'
			className={cn({
				[styles.hideSidebar]: !showSidebar,
			})}
		/>
	)
}

export default ShowSidebarBtn
