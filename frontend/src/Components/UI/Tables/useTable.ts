import moment from 'moment'
import { useEffect } from 'react'

import event from '@/store/Event'
import pickedDate from '@/store/PickedDate'
import reminder from '@/store/Reminder'
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
			reminder.clear()
			event.clear()
			return
		}
		const startTime = moment(date).startOf(timeZone).unix()
		const endTime = moment(date).endOf(timeZone).unix()
		task.getTasks({
			startTime,
			endTime,
		})
		reminder.getReminders({
			startTime,
			endTime,
		})
		event.getEvents({
			startTime,
			endTime,
		})
	}, [client, date, timeZone])
}
