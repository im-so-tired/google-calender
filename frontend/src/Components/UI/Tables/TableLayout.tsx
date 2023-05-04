import { observer } from 'mobx-react-lite'
import React, { FC, PropsWithChildren } from 'react'

import { useRedirect } from '@hooks/useRedirect'

import pickedDate from '@store/PickedDate'

const TableLayout: FC<PropsWithChildren> = observer(({ children }) => {
	const { timeZone, date } = pickedDate
	useRedirect(date, timeZone)
	return <div>{children}</div>
})

export default TableLayout
