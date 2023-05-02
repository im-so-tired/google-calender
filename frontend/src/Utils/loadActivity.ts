import axios, { CancelTokenSource } from 'axios'
import moment from 'moment/moment'
import toast from 'react-hot-toast'

import { UserService } from '@services/User.service'

import { errorMessage } from '@utils/errorMessage'

import event from '@store/Event'
import pickedDate from '@store/PickedDate'
import reminder from '@store/Reminder'
import task from '@store/Task'

let cancelToken: CancelTokenSource | null = null

export const loadActivity = async (): Promise<null> => {
	if (cancelToken) {
		cancelToken.cancel()
	}
	const { date, timeZone } = pickedDate
	const startTime = moment(date).startOf(timeZone).unix()
	const endTime = moment(date).endOf(timeZone).unix()
	cancelToken = axios.CancelToken.source()
	const toastId = toast.loading('Loading...')
	try {
		const activity = await UserService.getActivity(
			{ startTime, endTime },
			cancelToken.token
		)

		if (!cancelToken.token.reason) {
			const { events, tasks, reminders } = activity
			task.setTasks(tasks)
			event.setEvents(events)
			reminder.setReminders(reminders)
			toast.success('Date uploaded')
			toast.dismiss(toastId)
		}
	} catch (error) {
		toast.dismiss(toastId)
		if (axios.isCancel(error)) {
			console.log('Request cancelled', error)
		} else {
			toast.error(errorMessage(error))
		}
	}
	return null
}

export const cancelRequest = () => {
	if (cancelToken) {
		cancelToken.cancel()
		cancelToken = null
	}
}
