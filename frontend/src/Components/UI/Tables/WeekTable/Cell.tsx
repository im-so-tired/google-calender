import { Moment } from 'moment'
import { FC } from 'react'

import modals from '@/store/Modals'

const Cell: FC<{ date: Moment }> = ({ date }) => {
	return (
		<td onClick={() => modals.toggleCreateModal(date)}>{date.toString()}</td>
	)
}

export default Cell
