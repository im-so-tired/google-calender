import { MutableRefObject } from 'react'

import { Position } from '@/shared/types/position'

export const countDayPosition = (
	ref: MutableRefObject<HTMLLIElement | null>
) => {
	if (!ref.current) return
	const rect = ref.current.getBoundingClientRect()
	const halfWindowHeight = window.innerHeight / 2
	const position: Position = {
		left: 'auto',
		bottom: 'auto',
		right: 'auto',
		top: 'auto',
	}
	position.left = `${(rect.left + rect.right) / 2 - 224}px`

	if (rect.top < halfWindowHeight) {
		position.top = `${rect.top}px`
	} else {
		position.bottom = `${window.innerHeight - rect.bottom}px`
	}

	return position
}
