import { Moment } from 'moment'
import { FC } from 'react'

const Cell: FC<{ date: Moment }> = ({ date }) => {
	return <td>{date.toString()}</td>
}

export default Cell
