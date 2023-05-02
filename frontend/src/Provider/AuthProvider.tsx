import Cookies from 'js-cookie'
import { observer, useLocalObservable } from 'mobx-react-lite'
import React, { FC, PropsWithChildren, useEffect } from 'react'

import pickedDate from '@store/PickedDate'
import user from '@store/User'

const AuthProvider: FC<PropsWithChildren> = observer(({ children }) => {
	const { date, timeZone } = useLocalObservable(() => pickedDate)
	const localUserStore = useLocalObservable(() => user)

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (!accessToken && localUserStore.user) {
			localUserStore.logout()
		}
	}, [date, timeZone])
	return <>{children}</>
})

export default AuthProvider
