import { IOption } from '@/shared/types/SelectOpt'

export const defaultIconSize = 22

export const typeTableOptions: IOption<string>[] = [
	{ value: 'day', label: 'Day' },
	{ value: 'week', label: 'Week' },
	{ value: 'month', label: 'Month' },
]
