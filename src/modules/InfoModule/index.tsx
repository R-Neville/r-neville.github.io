import { useAppSelector } from '#/store'
import { FC } from 'react'
import IndexView from './IndexView'

const InfoModule: FC = () => {
    const { currentModule } = useAppSelector((state) => state.config)

    if (currentModule.getView() === 'index') {
        return <IndexView />
    }

    return <div></div>
}

export default InfoModule
