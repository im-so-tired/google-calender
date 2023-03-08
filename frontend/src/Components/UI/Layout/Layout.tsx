import { FC, useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import Header from './Header/Header'
import styles from './Layout.module.scss'
import Sidebar from './Sidebar/Sidebar'
import { LayoutProvider } from './useLayoutContext'

const Layout: FC = () => {
	const [showSidebar, setShowSidebar] = useState(true)

	const toggleSidebar = useCallback(() => {
		setShowSidebar(prev => !prev)
	}, [])

	const transitionStyles: any = {
		entering: { transform: 'translateX(-256px)' },
		entered: { transform: 'translateX(0)' },
		exiting: { transform: 'translateX(0)' },
		exited: { transform: 'translateX(-256px)' },
	}

	return (
		<div>
			<LayoutProvider value={{ showSidebar, toggleSidebar }}>
				<Header />
				<Transition in={showSidebar} timeout={0}>
					{state => (
						<div
							className={styles.wrapper}
							style={{ ...transitionStyles[state] }}
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
