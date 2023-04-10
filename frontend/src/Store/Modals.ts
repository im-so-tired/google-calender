import { makeAutoObservable } from 'mobx'
import moment, { Moment } from 'moment'

export type CreateModalType = 'event' | 'task' | 'reminder'

export interface ICreateModal {
	open: boolean
	type: CreateModalType
	selectedDate: Moment
}

class Modals {
	loginModal = false

	registerModal = false

	createModal: ICreateModal = {
		open: false,
		type: 'event',
		selectedDate: moment(),
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

	toggleCreateModal = (date: Moment = moment()) => {
		this.createModal.open = !this.createModal.open
		this.createModal.selectedDate = date
	}

	changeCreateModalType = (type: CreateModalType) => {
		this.createModal.type = type
	}
}

export default new Modals()
