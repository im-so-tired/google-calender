import { FC, useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import { LayoutProvider } from './useLayoutContext'

const Layout: FC = () => {
	const [showSidebar, setShowSidebar] = useState(true)

	const toggleSidebar = useCallback(() => {
		setShowSidebar(prev => !prev)
	}, [])

	return (
		<div>
			<LayoutProvider value={{ showSidebar, toggleSidebar }}>
				<Header />
				{showSidebar && <Sidebar />}
				<Outlet />
			</LayoutProvider>
		</div>
	)
}

export default Layout
