import Clickable from '#/components/shared/Clickable'
import Icon from '#/components/shared/Icon'
import icons from '#/icons'
import { setSidebarState, useAppDispatch, useAppSelector } from '#/store'
import { FC } from 'react'

const SidebarTrigger: FC = () => {
    const dispatch = useAppDispatch()

    const { sidebarState } = useAppSelector((state) => state.config)

    const { open } = sidebarState

    return (
        <Clickable
            variant="secondary"
            onClick={() => {
                void dispatch(setSidebarState({ ...sidebarState, open: !open }))
            }}
        >
            <Icon icon={icons.bars} size="lg" />
        </Clickable>
    )
}

export default SidebarTrigger
