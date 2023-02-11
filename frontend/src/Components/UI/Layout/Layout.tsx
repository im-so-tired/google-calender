import { FC, createContext, useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

interface ILayoutContext {
	showSidebar: boolean
	toggleSidebar: () => void
}

export const LayoutContext = createContext<ILayoutContext>({
	showSidebar: true,
	toggleSidebar: () => {},
})

const Layout: FC = () => {
	const [showSidebar, setShowSidebar] = useState(true)

	const toggleSidebar = useCallback(() => {
		setShowSidebar(prev => !prev)
	}, [])

	return (
		<div>
			<LayoutContext.Provider value={{ showSidebar, toggleSidebar }}>
				<Header />
				{showSidebar && <Sidebar />}
				<Outlet />
			</LayoutContext.Provider>
		</div>
	)
}

export default Layout
