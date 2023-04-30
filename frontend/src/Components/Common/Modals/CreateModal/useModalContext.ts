import { createContext, useContext } from 'react'
import { Control, UseFormGetValues, UseFormWatch } from 'react-hook-form'
import { IFormData } from '@common/Modals/Helpers/FormData.interface'


export interface IModalContext {
	setValue: any
	control: Control<IFormData>
	watch: UseFormWatch<IFormData>
	getValues: UseFormGetValues<IFormData>
}

const CreateModalContext = createContext<IModalContext | null>(null)

export const CreateModalProvider = CreateModalContext.Provider

export const useCreateModalContext = () => {
	const data = useContext(CreateModalContext)
	if (!data)
		throw new Error('Can not `useGameContext` outside of the `GameProvide`')
	return data
}
