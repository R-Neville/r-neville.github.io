import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

interface IIconProps {
    icon: IconDefinition
    size?: 'xs' | 'sm' | 'lg' | 'xl'
}

const Icon: FC<IIconProps> = (props: IIconProps) => {
    const { icon, size } = props

    return <FontAwesomeIcon icon={icon} size={size} />
}

export default Icon
