import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'

import modals from '@/store/Modals'

import CreateModal from '@/common/Modals/CreateModal/CreateModal'
import LoginModal from '@/common/Modals/Login/LoginModal'
import RegisterModal from '@/common/Modals/Login/RegisterModal'
import TaskModal from '@/common/Modals/TaskModal/TaskModal'

const AllModals: FC = observer(() => {
	return (
		<>
			<LoginModal open={modals.loginModal} onClose={modals.toggleLoginModal} />
			<RegisterModal
				open={modals.registerModal}
				onClose={modals.toggleRegisterModal}
			/>
			{modals.createModal.open ? (
				<CreateModal
					open={modals.createModal.open}
					onClose={modals.toggleCreateModal}
				/>
			) : null}
			<TaskModal
				open={modals.taskModal.open}
				onClose={modals.toggleTaskModal}
			/>
		</>
	)
})

export default AllModals
