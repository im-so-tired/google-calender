import moment, { Moment } from 'moment/moment'
import { ChangeEvent, useState } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { SingleValue } from 'react-select'

import { IOption } from '@/shared/types/SelectOpt'
import { RepeatType } from '@/shared/types/repeatType'

export const useEvent = () => {
	const [day, setDay] = useState<Moment | null>()
	const [startHour, setStartHour] = useState<number>(moment().hour())
	const [endHour, setEndHour] = useState<number>(moment().hour() + 1)
	const [repeat, setRepeat] = useState<RepeatType>('no-repeat')
	const [guests, setGuests] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value)
	}
	const changeGuests = (e: ChangeEvent<HTMLInputElement>) => {
		setGuests(e.target.value)
	}

	const changeDay = (newDate: Moment | null) => {
		if (!newDate) return
		setDay(newDate)
	}

	const changeRepeat = (newOption: SingleValue<IOption<RepeatType>>) => {
		const newValue = (newOption as IOption<RepeatType>).value
		setRepeat(newValue)
	}
	const changeStartHour = (newOption: SingleValue<IOption<number>>) => {
		const newValue = (newOption as IOption<number>).value
		setStartHour(newValue)
		if (newValue >= endHour) {
			setEndHour(newValue + 1)
		}
	}

	const changeEndHour = (newOption: SingleValue<IOption<number>>) => {
		const newValue = (newOption as IOption<number>).value
		setEndHour(newValue)
		if (newValue <= startHour) {
			setStartHour(newValue - 1)
		}
	}

	return {
		day,
		changeDay,
		startHour,
		endHour,
		changeEndHour,
		changeStartHour,
		repeat,
		changeRepeat,
		guests,
		changeGuests,
		description,
		changeDescription,
	}
}
