import { observer } from 'mobx-react-lite'
import React, { FC, memo, useState } from 'react'

import defaultAvatar from '@/assets/images/default-avatar.png'

import modals from '@/store/Modals'
import userStore from '@/store/User'

import styles from '../Layout.module.scss'

import CreateBtn from './CreateBtn/CreateBtn'
import Logo from './Logo'
import Navigation from './Navigation/Navigation'
import SelectTimeZone from './SelectTimeZone'
import ShowSidebarBtn from './ShowSidebarBtn'
import CircleBtn from '@/common/Buttons/CircleBtn/CircleBtn'
import DropDown from '@/common/DropDown/DropDown'

const Header: FC = memo(
	observer(() => {
		const { user } = userStore
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
						{user ? (
							<>
								<img
									className={styles.avatar}
									height={40}
									width={40}
									alt="avatar"
									src={
										user.avatarPath
											? `http://localhost:9000/upload/avatars/${user.avatarPath}`
											: defaultAvatar
									}
								/>
								<span>{user.name}</span>
							</>
						) : (
							<>
								<button onClick={modals.toggleLoginModal} className="navBtn">
									Login
								</button>
								<button onClick={modals.toggleRegisterModal} className="navBtn">
									Register
								</button>
							</>
						)}
					</div>
				</div>
				<CreateBtn />
			</header>
		)
	})
)

Header.displayName = 'Header'
export default Header
