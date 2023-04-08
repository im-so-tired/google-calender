import { makeAutoObservable } from 'mobx'

export type CreateModalType = 'event' | 'task' | 'reminder'

export interface ICreateModal {
	open: boolean
	type: CreateModalType
}

class Modals {
	loginModal = false

	registerModal = false

	createModal: ICreateModal = {
		open: false,
		type: 'event',
	}

	constructor() {
		makeAutoObservable(this)
	}

	toggleLoginModal = () => {
		this.loginModal = !this.loginModal
	}

	toggleRegisterModal = () => {
		this.registerModal = !this.registerModal
	}

	toggleCreateModal = () => {
		this.createModal.open = !this.createModal.open
	}

	changeCreateModalType = (type: CreateModalType) => {
		this.createModal.type = type
	}
}

export default new Modals()
