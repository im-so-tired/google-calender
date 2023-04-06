import { IOption } from '@/shared/types/SelectOpt'
import { RepeatType } from '@/shared/types/repeatType'

export const repeatOption: IOption<RepeatType>[] = [
	{
		label: 'No repeat',
		value: 'no-repeat',
	},
	{
		label: 'Daily',
		value: 'daily',
	},
	{
		label: 'Weekly',
		value: 'weekly',
	},
	{
		label: 'Monthly',
		value: 'monthly',
	},
]
