import cn from 'classnames'
import React, { FC } from 'react'

import styles from '../Layout.module.scss'
import { useLayoutContext } from '../useLayoutContext'

import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'

const ShowSidebarBtn: FC = () => {
	const { showSidebar, toggleSidebar } = useLayoutContext()
	return (
		<CircleBtn
			onClick={toggleSidebar}
			bgColor="gray"
			size={48}
			iconSize={24}
			icon="MdDehaze"
			className={cn({
				[styles.hideSidebar]: !showSidebar,
			})}
		/>
	)
}

export default ShowSidebarBtn
