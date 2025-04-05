import { Theme, themes, Variant } from '#/theme'
import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'

interface IButtonProps {
    children: React.ReactNode
    theme?: Theme
    variant?: Variant
    onClick?: () => void
}

const Button: FC<IButtonProps> = (props) => {
    const { children, theme = 'primary', variant = 'normal', onClick } = props

    const themeClassNames = themes[theme][variant]

    return (
        <button
            className={`flex items-center py-1 px-2 rounded select-none outline-none cursor-pointer ${themeClassNames}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default React.memo(Button, arePropsEqual([]))
