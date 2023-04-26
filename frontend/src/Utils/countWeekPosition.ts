import { MutableRefObject } from 'react'

import { Position } from '@/shared/types/position'

export const countWeekPosition = (
	ref: MutableRefObject<HTMLLIElement | null>
) => {
	if (!ref.current) return
	const rect = ref.current.getBoundingClientRect()
	const halfWindowWidth = window.innerWidth / 2
	const halfWindowHeight = window.innerHeight / 2
	let position: Position
	if (rect.left < halfWindowWidth) {
		if (rect.top < halfWindowHeight) {
			position = {
				top: `${rect.top}px`,
				left: `${rect.right}px`,
				right: 'auto',
				bottom: 'auto',
			}
		} else {
			position = {
				top: 'auto',
				left: `${rect.right}px`,
				right: 'auto',
				bottom: `${window.innerHeight - rect.bottom}px`,
			}
		}
	} else if (rect.top < halfWindowHeight) {
		position = {
			top: `${rect.top}px`,
			left: 'auto',
			right: `${window.innerWidth - rect.left}px`,
			bottom: 'auto',
		}
	} else {
		position = {
			top: 'auto',
			left: 'auto',
			right: `${window.innerWidth - rect.left}px`,
			bottom: `${window.innerHeight - rect.bottom}px`,
		}
	}

	return position
}
