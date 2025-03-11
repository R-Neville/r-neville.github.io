import { useAppSelector } from '#/store'
import { FC } from 'react'
import HorizontalVirtualiserView from './HorizontalVirtualiserView'
import IndexView from './IndexView'

const ComponentsModule: FC = () => {
    const { currentModule } = useAppSelector((state) => state.config)

    switch (currentModule.getView()) {
        case 'index':
            return <IndexView />
        case 'HorizontalVirtualiser':
            return <HorizontalVirtualiserView />
    }

    return <div></div>
}

export default ComponentsModule
