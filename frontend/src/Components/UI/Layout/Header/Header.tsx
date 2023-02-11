import { FC, memo } from 'react'

import styles from '../Layout.module.scss'

import Logo from './Logo'
import Navigation from './Navigation/Navigation'
import SelectTypeTable from './SelectTypeTable'
import ShowSidebarBtn from './ShowSidebarBtn'
import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'

const Header: FC = memo(() => {
	return (
		<header className={styles.header}>
			<div>
				<ShowSidebarBtn />
				<Logo />
				<Navigation />
			</div>
			<div>
				<CircleBtn icon="MdSearch" size={40} iconSize={24} />
				<CircleBtn icon="MdInfoOutline" size={40} iconSize={24} />
				<CircleBtn icon="MdSettings" size={40} iconSize={24} />
				<SelectTypeTable />
			</div>
		</header>
	)
})

Header.displayName = 'Header'
export default Header
