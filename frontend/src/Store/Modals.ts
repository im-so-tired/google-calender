import { makeAutoObservable } from 'mobx'

class Modals {
	loginModal = false

	registerModal = false

	constructor() {
		makeAutoObservable(this)
	}

	toggleLoginModal = () => {
		this.loginModal = !this.loginModal
	}

	toggleRegisterModal = () => {
		this.registerModal = !this.registerModal
	}
}

export default new Modals()
