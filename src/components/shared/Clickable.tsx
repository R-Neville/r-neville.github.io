import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, JSX } from 'react'

type ClickableVariant = 'primary' | 'secondary'

const variants: Record<ClickableVariant, string> = {
    primary:
        'bg-primary-500 hover:bg-primary-600 text-primary-50 cursor-pointer border-primary-100/70',
    secondary:
        'bg-primary-50 hover:bg-primary-100 text-primary-500 cursor-pointer border-primary-100/70',
}

interface IClickable {
    children: JSX.Element
    variant?: ClickableVariant
    onClick?: () => void
}

const Clickable: FC<IClickable> = (props) => {
    const { children, variant = 'primary', onClick } = props

    const themeClassNames = variants[variant]

    return (
        <div
            className={`flex items-center py-1 px-2 rounded ${themeClassNames}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default React.memo(Clickable, arePropsEqual<IClickable>([]))
