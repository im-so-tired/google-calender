import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { IconTypes } from '@shared/types/IconTypes'

import { defaultIconSize } from '@utils/constants'

interface IMaterialIconProps {
	name: IconTypes
	color: string
	size: number
}

const MaterialIcon: FC<IMaterialIconProps> = ({ name, color = '#5f6368', size = defaultIconSize }) => {
	const IconComponent = MaterialIcons[name]
	return (
		<IconComponent color={color} size={size} /> || (
			<MaterialIcons.MdDragIndicator color={color} size={size} />
		)
	)
}

export default MaterialIcon
