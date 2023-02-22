import { FC, memo } from 'react'

import styles from '../Layout.module.scss'

import CreateBtn from './CreateBtn/CreateBtn'
import Logo from './Logo'
import Navigation from './Navigation/Navigation'
import SelectTimeZone from './SelectTimeZone'
import ShowSidebarBtn from './ShowSidebarBtn'
import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'
import DropDown from '@/common/DropDown/DropDown'

const Header: FC = memo(() => {
	return (
		<header className={styles.header}>
			<div>
				<div>
					<ShowSidebarBtn />
					<Logo />
					<Navigation />
				</div>
				<div className={styles.extraOptions}>
					<CircleBtn icon="MdSearch" size={40} iconSize={24} />
					<DropDown
						options={[
							{ value: 'help', label: 'Help' },
							{ value: 'training', label: 'Training' },
							{ value: 'updates', label: 'Updates' },
						]}
						clickHandler={() => null}
						openingDirection="left"
					>
						<CircleBtn icon="MdInfoOutline" size={40} iconSize={24} />
					</DropDown>
					<DropDown
						options={[
							{ value: 'setting', label: 'Setting' },
							{ value: 'bin', label: 'Bin' },
						]}
						clickHandler={() => null}
					>
						<CircleBtn icon="MdSettings" size={40} iconSize={24} />
					</DropDown>
					<SelectTimeZone />
				</div>
			</div>
			<CreateBtn />
		</header>
	)
})

Header.displayName = 'Header'
export default Header
