import ErrorModal from '#/modals/ErrorModal'
import Modules from '#/modules'
import { useAppSelector } from '#/store'
import { FC } from 'react'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'

const Main: FC = () => {
    const { sidebarState } = useAppSelector((state) => state.config)

    let gridCols = 'grid-cols-[minmax(0px,_100%)]'
    if (sidebarState.open && !sidebarState.float) {
        gridCols = 'grid-cols-[max-content_minmax(0px,_100%)]'
    }

    return (
        <div className="grid grid-rows-[max-content_minmax(0px,_100%)] h-full w-full p-0">
            <AppHeader />
            <div className={`grid ${gridCols} relative h-full`}>
                <AppSidebar />
                <Modules />
            </div>
            <ErrorModal />
        </div>
    )
}

export default Main
