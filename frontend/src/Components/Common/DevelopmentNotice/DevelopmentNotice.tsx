import { FC } from 'react'

import styles from './DevelopmentNotice.module.scss'

const DevelopmentNotice: FC = () => {
	return (
		<div className={styles.notice}>
			<h2>Page is under construction</h2>
			<span>it will work very soon</span>
		</div>
	)
}

export default DevelopmentNotice
