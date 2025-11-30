import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'

interface IAudioPlayerProps {
    audioUrl: string
}

const AudioPlayerComponent: FC<IAudioPlayerProps> = (props) => {
    const { audioUrl } = props

    return <div>AudioPlayer</div>
}

export const AudioPlayer = React.memo(AudioPlayerComponent, arePropsEqual([]))
