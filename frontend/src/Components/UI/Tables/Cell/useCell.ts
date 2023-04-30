import moment from 'moment'

import { useLayoutContext } from '@ui/Layout/useLayoutContext'
import { CellProps } from '@ui/Tables/Cell/Cell'


export const useCell = ({ events, reminders, tasks, date }: Omit<CellProps, 'countDay'>) => {

	const { showSidebar } = useLayoutContext()
	const approachTasks = tasks.filter(
		el =>
			el.time >= moment(date).unix() &&
			el.time < moment(date).add(1, 'h').unix(),
	)
	const approachEvents = events.filter(
		el =>
			!(
				moment(date).unix() < el.startTime ||
				moment(date).add(1, 'h').unix() > el.endTime
			),
	)
	const approachReminders = reminders.filter(
		el =>
			el.time >= moment(date).unix() &&
			el.time < moment(date).add(1, 'h').unix(),
	)
	const countActivity =
		approachReminders.length + approachEvents.length + approachTasks.length
	let maxWidth = window.innerWidth - 56 - 16
	if (showSidebar) maxWidth -= 256

	return {
		approachEvents,
		approachTasks,
		approachReminders,
		maxWidth,
		countActivity,
	}
}
