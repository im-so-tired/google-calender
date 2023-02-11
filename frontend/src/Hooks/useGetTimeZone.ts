import { useLocation } from 'react-router-dom'

export const useGetTimeZone = () => {
	const { pathname } = useLocation()
	return pathname.split('/')[1]
}
