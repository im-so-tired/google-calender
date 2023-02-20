import React, { FC } from 'react'

import PlusLogo from '@/assets/plus.png'

import styles from './CreateBtn.module.scss'
import Icon from '@/common/Icon'

interface ICreateBtn {
	view: 'full' | 'short'
}

const CreateBtn: FC<ICreateBtn> = ({ view }) => {
	return view === 'full' ? (
		<button className={styles.createBtn}>
			<img alt="plus" src={PlusLogo} height={24} width={24} />
			<span>Create</span>
			<Icon name="MdArrowDropDown" />
		</button>
	) : (
		<button>+</button>
	)
}

export default CreateBtn
