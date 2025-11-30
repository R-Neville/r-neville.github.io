import { Theme, themes, Variant } from '#/theme'
import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'

interface IButtonLinkProps {
    href: string
    theme?: Theme
    variant?: Variant
    newTab?: boolean
    children: React.ReactNode
}

const ButtonLink: FC<IButtonLinkProps> = (props) => {
    const {
        href,
        newTab = false,
        theme = 'primary',
        variant = 'normal',
        children,
    } = props

    const themeClassNames = themes[theme][variant]

    return (
        <a
            href={href}
            target={newTab ? '__blank' : undefined}
            className={`flex items-center py-1 px-2 rounded select-none ${themeClassNames}`}
        >
            {children}
        </a>
    )
}

export default React.memo(ButtonLink, arePropsEqual([]))
