import { useAppSelector } from '#/store'
import { FC } from 'react'
import SplashView from './SplashView'

const Views: FC = () => {
    const { currentView } = useAppSelector((state) => state.config)

    if (currentView === 'splash') {
        return <SplashView />
    }

    return <div></div>
}

export default Views
