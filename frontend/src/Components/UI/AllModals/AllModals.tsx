import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'

import modals from '@/store/Modals'

import LoginModal from '@/common/Modals/Login/LoginModal'
import RegisterModal from '@/common/Modals/Login/RegisterModal'

const AllModals: FC = observer(() => {
	return (
		<>
			<LoginModal open={modals.loginModal} onClose={modals.toggleLoginModal} />
			<RegisterModal
				open={modals.registerModal}
				onClose={modals.toggleRegisterModal}
			/>
		</>
	)
})

export default AllModals
