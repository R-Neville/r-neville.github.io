import Icon from '#/components/shared/Icon'
import PopoverMenu, {
    IPopoverMenuOption,
} from '#/components/shared/PopoverMenu'
import icons from '#/icons'
import { FC, useMemo } from 'react'

const UserMenu: FC = () => {
    const options = useMemo(() => {
        const opts: IPopoverMenuOption[] = [
            {
                text: 'View Profile',
                action: () => {},
            },
            {
                text: 'Settings',
                action: () => {},
            },
            {
                text: 'Logout',
                action: () => {},
            },
        ]

        return opts
    }, [])

    return (
        <PopoverMenu
            minWidth={200}
            placement="left"
            options={options}
            trigger={<Icon icon={icons.user} size="lg" />}
        />
    )
}

export default UserMenu
