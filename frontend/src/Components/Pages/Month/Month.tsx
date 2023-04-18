import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { useRedirect } from '@/hooks/useRedirect'

const MonthPage: FC = observer(() => {
	useRedirect()
	return <div>Month</div>
})

export default MonthPage
