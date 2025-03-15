import { useAppSelector } from '#/store'
import { FC } from 'react'
import HorizontalVirtualiserView from './HorizontalVirtualiserView'
import IndexView from './IndexView'
import VerticalVirtualiserView from './VerticalVirtualiserView'

const ComponentsModule: FC = () => {
    const { currentModule } = useAppSelector((state) => state.config)

    switch (currentModule.getView()) {
        case 'index':
            return <IndexView />
        case 'HorizontalVirtualiser':
            return <HorizontalVirtualiserView />
        case 'VerticalVirtualiser':
            return <VerticalVirtualiserView />
    }

    return <div></div>
}

export default ComponentsModule
