import cn from 'classnames'
import React, { FC, useRef, useState } from 'react'

import { useLayoutContext } from '@/ui/Layout/useLayoutContext'

import PlusLogo from '@/assets/plus.png'

import modals, { CreateModalType } from '@/store/Modals'

import styles from './CreateBtn.module.scss'
import DropDownAbsolute from '@/common/DropDown/DropDownAbsolute'
import Icon from '@/common/Icon'

const CreateBtn: FC = () => {
	const btnRef = useRef<HTMLButtonElement | null>(null)
	const [dropDownOpened, setDropDownOpened] = useState(false)
	const { showSidebar } = useLayoutContext()
	const clickHandler = () => {
		setDropDownOpened(prev => !prev)
	}
	return (
		<>
			<button
				ref={btnRef}
				className={cn(styles.createBtn, { [styles.rounded]: !showSidebar })}
				onClick={() => clickHandler()}
			>
				<img alt="plus" src={PlusLogo} height={24} width={24} />
				{showSidebar && (
					<>
						<span>Create</span>
						<Icon name="MdArrowDropDown" />
					</>
				)}
			</button>
			<DropDownAbsolute
				elem={btnRef}
				options={[
					{ value: 'event', label: 'Event' },
					{ value: 'task', label: 'Task' },
				]}
				clickHandler={value => {
					modals.toggleCreateModal()
					modals.changeCreateModalType(value as CreateModalType)
				}}
				opened={dropDownOpened}
				setOpened={setDropDownOpened}
			/>
		</>
	)
}

export default CreateBtn
