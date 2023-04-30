import React, { FC } from 'react'

import styles from '@common/Modals/ConfirmModals/ConfirmModal.module.scss'

interface FooterProps {
	confirm: () => void
	cancel: () => void
}

const Footer: FC<FooterProps> = ({ cancel, confirm }) => {
	return (
		<div className={styles.footer}>
			<button onClick={() => cancel()} className={styles.cancelBtn}>
				Cancel
			</button>
			<button onClick={confirm} className={styles.okBtn}>
				OK
			</button>
		</div>
	)
}

export default Footer
