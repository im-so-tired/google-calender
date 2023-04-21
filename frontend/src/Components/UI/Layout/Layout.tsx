import { observer } from 'mobx-react-lite'
import { FC, useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import { LayoutProvider } from '@/ui/Layout/useLayoutContext'

import pickedDate from '@/store/PickedDate'

import Header from './Header/Header'
import styles from './Layout.module.scss'
import Sidebar from './Sidebar/Sidebar'
import { toggleSidebarAnimation } from '@/styles/animations/toggleSidebarAnimation'

const Layout: FC = () => {
	const [showSidebar, setShowSidebar] = useState(true)

	const toggleSidebar = useCallback(() => {
		setShowSidebar(prev => !prev)
	}, [])

	return (
		<div>
			<LayoutProvider value={{ showSidebar, toggleSidebar }}>
				<Header />
				<Transition in={showSidebar} timeout={0}>
					{state => (
						<div
							className={styles.wrapper}
							style={{ ...toggleSidebarAnimation[state] }}
						>
							<Sidebar />
							<main>
								<Outlet />
							</main>
						</div>
					)}
				</Transition>
			</LayoutProvider>
		</div>
	)
}

export default Layout
