export interface ILoginFields {
	email: string
	password: string
}

export interface IRegisterFields extends ILoginFields {
	name: string
}
