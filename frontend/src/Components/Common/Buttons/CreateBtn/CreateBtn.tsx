import React, { FC } from 'react'

interface ICreateBtn {
	view: 'full' | 'short'
}

const CreateBtn: FC<ICreateBtn> = ({ view }) => {
	return view === 'full' ? <button>Create</button> : <button>+</button>
}

export default CreateBtn
