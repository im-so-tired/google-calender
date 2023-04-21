import moment from 'moment'
import { useEffect } from 'react'

import pickedDate from '@/store/PickedDate'
import task from '@/store/Task'
import user from '@/store/User'

export const useTable = () => {
	const { timeZone, date } = pickedDate
	const { user: client } = user

	useEffect(() => {
		localStorage.setItem('timeZone', JSON.stringify({ value: timeZone }))
		localStorage.setItem('date', JSON.stringify(date))
		if (!client) {
			task.clearTasks()
			return
		}
		task.getTasks({
			startTime: moment(date).startOf(timeZone).unix(),
			endTime: moment(date).endOf(timeZone).unix(),
		})
	}, [client, date, timeZone])
}
