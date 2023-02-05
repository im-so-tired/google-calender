import { FC } from 'react'
import { Link } from 'react-router-dom'

import ShowSidebarBtn from './ShowSidebarBtn'

const Header: FC = () => {
	return (
		<header>
			<ShowSidebarBtn />
		</header>
	)
}

export default Header
