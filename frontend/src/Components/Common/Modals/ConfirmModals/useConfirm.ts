import React, { useState } from 'react'

import { ConfirmValue } from '@common/Modals/ConfirmModals/ConfirmValue.type'

export const useConfirm = () => {
	const [value, setValue] = useState<ConfirmValue>('one')
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value as ConfirmValue)
	}

	return {
		value,
		handleChange,
	}
}
