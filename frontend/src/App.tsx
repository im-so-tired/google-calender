import { FC } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import DayPage from './Components/Pages/Day/Day'
import MonthPage from './Components/Pages/Month/Month'
import WeekPage from './Components/Pages/Week/Week'
import Layout from './Components/UI/Layout/Layout'
import { getCurrentDate } from './Utils/Date/getCurrentDate'

const currentDate = getCurrentDate()

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
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
				element: <DayPage />,
			},
			{
				path: '/week/:year/:month/:day',
				element: <WeekPage />,
			},
			{
				path: '/month/:year/:month/:day',
				element: <MonthPage />,
			},
		],
	},
])

const App: FC = () => {
	return <RouterProvider router={router} />
}

export default App
