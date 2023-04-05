import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'

import defaultAvatar from '@/assets/images/default-avatar.png'

import modals from '@/store/Modals'
import userStore from '@/store/User'

import styles from './Profile.module.scss'
import DropDown from '@/common/DropDown/DropDown'

const Profile: FC = observer(() => {
	const { user } = userStore
	return (
		<>
			{user ? (
				<DropDown
					options={[{ value: 'Logout', label: 'Logout' }]}
					clickHandler={() => userStore.logout()}
					openingDirection="left"
				>
					<div className={styles.wrapper}>
						<img
							height={40}
							width={40}
							className={styles.avatar}
							alt="avatar"
							src={
								user.avatarPath
									? `http://localhost:9000/upload/avatars/${user.avatarPath}`
									: defaultAvatar
							}
						/>
						<span>{user.name}</span>
					</div>
				</DropDown>
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
		</>
	)
})

export default Profile
