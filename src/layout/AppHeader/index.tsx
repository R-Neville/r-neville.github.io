import { FC } from 'react'
import SidebarTrigger from './SidebarTrigger'

const AppHeader: FC = () => {
    return (
        <div className="flex items-center justify-between py-2 px-4 border-b z-48 border-primary-100 text-primary-800 shadow">
            <SidebarTrigger />
            <div className="text-lg select-none">R-Neville Portfolio</div>
        </div>
    )
}

export default AppHeader
