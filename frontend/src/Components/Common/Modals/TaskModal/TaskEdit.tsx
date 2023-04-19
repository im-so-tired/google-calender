import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { repeatOption } from '@/shared/constants/repeatOption'

import modals from '@/store/Modals'

import { IFormData } from '@/common/Modals/CreateModal/Helpers/FormData.interface'
import { startTimeOption } from '@/common/Modals/CreateModal/Helpers/createOptions'

interface ITaskData extends Omit<IFormData, 'guests' | 'endHour'> {}

const TaskEdit: FC = observer(() => {
	const { task } = modals.taskModal
	if (!task) return null
	const { handleSubmit, setValue, control, getValues, reset } =
		useForm<ITaskData>({
			defaultValues: {
				title: task.title,
				description: task.description,
				day: moment.unix(task.time || 0),
				startHour: startTimeOption.find(
					op => op.value === moment.unix(task.time || 0).hour()
				),
				repeat: repeatOption.find(op => op.value === task.repeat),
			},
		})

	const onSubmit = (data: ITaskData) => {
		console.log(data)
	}

	useEffect(() => {
		return () => reset()
	}, [reset])
	return <form onSubmit={handleSubmit(onSubmit)}></form>
})

export default TaskEdit
