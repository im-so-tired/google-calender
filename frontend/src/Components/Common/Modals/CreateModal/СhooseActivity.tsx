import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'

import modals, { CreateModalType } from '@/store/Modals'

import styles from '../CrudModal.module.scss'

import Event from '@/common/Modals/CreateModal/Activity/Event'
import Reminder from '@/common/Modals/CreateModal/Activity/Reminder'
import Task from '@/common/Modals/CreateModal/Activity/Task'

const btns: CreateModalType[] = ['event', 'task', 'reminder']
const ChooseActivity: FC = observer(() => {
	const created = modals.createModal.type
	useEffect(() => {}, [created])
	return (
		<>
			<div className={styles.flexComp}>
				<div />
				<div className={styles.selectTheCreated}>
					{btns.map(value => (
						// eslint-disable-next-line jsx-a11y/control-has-associated-label
						<button
							key={value}
							className={created === value ? styles.selected : ''}
							onClick={e => {
								e.preventDefault()
								modals.changeCreateModalType(value)
							}}
							// onClick={() => setCreated(value)}
						>
							{value}
						</button>
					))}
				</div>
			</div>
			{created === 'event' ? <Event /> : null}
			{created === 'task' ? <Task /> : null}
			{created === 'reminder' ? <Reminder /> : null}
		</>
	)
})

export default ChooseActivity
