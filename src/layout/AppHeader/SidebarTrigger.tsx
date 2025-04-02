import Button from '#/components/Button'
import Icon from '#/components/Icon'
import icons from '#/icons'
import { setSidebarState, useAppDispatch, useAppSelector } from '#/store'
import { FC } from 'react'

const SidebarTrigger: FC = () => {
    const dispatch = useAppDispatch()

    const { sidebarState } = useAppSelector((state) => state.config)

    const { open } = sidebarState

    return (
        <Button
            theme={open ? 'primary' : 'secondary'}
            onClick={() => {
                void dispatch(setSidebarState({ ...sidebarState, open: !open }))
            }}
        >
            <Icon icon={icons.bars} size="lg" />
        </Button>
    )
}

export default SidebarTrigger
