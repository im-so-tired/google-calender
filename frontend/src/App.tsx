import DevelopmentNotice from '@common/DevelopmentNotice/DevelopmentNotice'
import { FC } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import AllModals from '@ui/AllModals/AllModals'
import DayTable from '@ui/Tables/DayTable/DayTable'
import TableLayout from '@ui/Tables/TableLayout'
import WeekTable from '@ui/Tables/WeekTable/WeekTable'

import { getCurrentDate } from '@utils/date/getCurrentDate'

import Layout from './Components/UI/Layout/Layout'
import MainProvider from './Provider/MainProvider'

const currentDate = getCurrentDate()

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<AllModals />
				<Layout />
			</>
		),
		children: [
			{
				path: '/',
				element: (
					<Navigate
						to={`/day/${currentDate.year}/${currentDate.month}/${currentDate.day}`}
					/>
				),
			},
			{
				path: '/day/:year/:month/:day',
				element: (
					<TableLayout>
						<DayTable />
					</TableLayout>
				),
			},
			{
				path: '/week/:year/:month/:day',
				element: (
					<TableLayout>
						<WeekTable />
					</TableLayout>
				),
				// loader: loadActivity,
			},
			{
				path: '/month/:year/:month/:day',
				element: (
					<TableLayout>
						<DevelopmentNotice />
					</TableLayout>
				),
			},
		],
	},
])

const App: FC = () => {
	return (
		<MainProvider>
			<RouterProvider router={router} />
		</MainProvider>
	)
}

export default App
