import { useAppSelector } from '#/store'
import { FC } from 'react'
import ComponentsModule from './ComponentsModule'
import InfoModule from './InfoModule'
import MusicModule from './MusicModule'

const Modules: FC = () => {
    const { currentModule } = useAppSelector((state) => state.config)

    switch (currentModule.getType()) {
        case 'info':
            return <InfoModule />
        case 'components':
            return <ComponentsModule />
        case 'music':
            return <MusicModule />
    }
}

export default Modules
