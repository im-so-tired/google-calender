import React from 'react'

import { IOption } from '@/shared/types/SelectOpt'

export interface IDropDownProps {
	options: IOption[]
	clickHandler: (value: string) => void
	children: React.ReactNode
	openingDirection?: 'left' | 'right' | 'center'
}
