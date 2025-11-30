import { Theme, themes, Variant } from '#/theme'
import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, JSX } from 'react'

interface IClickableProps {
    children: JSX.Element
    theme?: Theme
    variant?: Variant
    onClick?: () => void
}

const Clickable: FC<IClickableProps> = (props) => {
    const { children, theme = 'primary', variant = 'normal', onClick } = props

    const themeClassNames = themes[theme][variant]

    return (
        <div
            className={`flex items-center py-1 px-2 rounded select-none ${themeClassNames}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default React.memo(Clickable, arePropsEqual([]))
