import { useEffect } from 'react'

import { cancelRequest, loadActivity } from '@utils/loadActivity'

import event from '@store/Event'
import pickedDate from '@store/PickedDate'
import reminder from '@store/Reminder'
import task from '@store/Task'
import user from '@store/User'

export const useTable = () => {
	const { timeZone, date } = pickedDate
	const { user: client } = user

	useEffect(() => {
		localStorage.setItem('timeZone', JSON.stringify({ value: timeZone }))
		localStorage.setItem('date', JSON.stringify({ value: date }))
		cancelRequest()
		if (!client) {
			task.clearTasks()
			reminder.clear()
			event.clear()
		} else {
			loadActivity()
		}
	}, [client, date])
}
