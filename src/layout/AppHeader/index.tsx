import Button from '#/components/Button'
import Icon from '#/components/Icon'
import icons from '#/icons'
import { useAppDispatch, useAppSelector } from '#/store'
import ModuleDefinition from '#/store/config/model/ModuleDefinition'
import { setCurrentModule } from '#/store/config/thunks/setCurrentModule'
import { FC, useMemo } from 'react'
import SidebarTrigger from './SidebarTrigger'

const AppHeader: FC = () => {
    const dispatch = useAppDispatch()

    const { currentModule } = useAppSelector((state) => state.config)

    const showHomeOption = useMemo(() => {
        return (
            currentModule.getType() !== 'info' ||
            currentModule.getView() !== 'index'
        )
    }, [currentModule])

    return (
        <div className="flex items-center justify-between py-2 px-4 border-b z-48 border-primary-100 text-primary-800 shadow">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="text-lg select-none">R-Neville</div>
            </div>
            <div className="flex items-center gap-2">
                {showHomeOption && (
                    <Button
                        theme="secondary"
                        onClick={() => {
                            void dispatch(
                                setCurrentModule(
                                    new ModuleDefinition('info', 'index'),
                                ),
                            )
                        }}
                    >
                        <div className="p-1/2">
                            <Icon icon={icons.home} />
                        </div>
                    </Button>
                )}
            </div>
        </div>
    )
}

export default AppHeader
