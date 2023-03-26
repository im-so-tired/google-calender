import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'

import modals from '@/store/Modals'

import LoginModal from '@/common/Modals/Login/LoginModal'

const AllModals: FC = observer(() => {
	return (
		<>
			<LoginModal open={modals.loginModal} onClose={modals.toggleLoginModal} />
		</>
	)
})

export default AllModals
