import { FC } from 'react'

import styles from '../Layout.module.scss'

import Logo from './Logo'
import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div>
				<CircleBtn bgColor="gray" size={48} iconSize={24} icon="MdDehaze" />
				<Logo />
			</div>
		</header>
	)
}

export default Header
