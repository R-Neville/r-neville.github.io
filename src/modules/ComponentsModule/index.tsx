import { useAppSelector } from '#/store'
import { FC } from 'react'
import CalendarView from './CalendarView'
import HorizontalVirtualiserView from './HorizontalVirtualiserView'
import IndexView from './IndexView'
import SynthView from './SynthModule'
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
        case 'Calendar':
            return <CalendarView />
        case 'Synth':
            return <SynthView />
    }

    return <div></div>
}

export default ComponentsModule
