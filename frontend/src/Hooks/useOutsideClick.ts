import { MutableRefObject, useEffect, useRef } from 'react'

import { useLatest } from '@/hooks/useLatest'

export const useOutsideClick = (
	elemRef: MutableRefObject<null>,
	handler: () => void,
	attached = true
) => {
	const handlerRef = useLatest(handler)
	useEffect(() => {
		if (!attached && !elemRef !== null) return
		const handleClick = (e: Event) => {
			if (elemRef.current !== e.target) {
				handlerRef.current()
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [attached, elemRef, handlerRef])
}
