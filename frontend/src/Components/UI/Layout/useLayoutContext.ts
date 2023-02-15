import { createContext, useContext } from 'react'

interface ILayoutContext {
	showSidebar: boolean
	toggleSidebar: () => void
}

const LayoutContext = createContext<ILayoutContext | null>(null)

export const LayoutProvider = LayoutContext.Provider

export const useLayoutContext = () => {
	const data = useContext(LayoutContext)
	if (!data)
		throw new Error('Can not `useLayoutContext` outside of the `LayoutProvide`')
	return data
}
