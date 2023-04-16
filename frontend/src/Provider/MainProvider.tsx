import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Toaster position="top-right" />
			{children}
		</LocalizationProvider>
	)
}

export default MainProvider
