import { FC } from 'react'

import styles from '../Layout.module.scss'

const Sidebar: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.emptyDiv}></div>
			<div>Sidebar</div>
		</aside>
	)
}

export default Sidebar
