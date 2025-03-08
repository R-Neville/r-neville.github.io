import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'
import Clickable from './Clickable'

interface IButtonLinkProps {
    href: string
    newTab?: boolean
    children: React.ReactNode
}

const ButtonLink: FC<IButtonLinkProps> = (props) => {
    const { href, newTab = false, children } = props
    return (
        <Clickable>
            <a href={href} target={newTab ? '__blank' : undefined}>
                {children}
            </a>
        </Clickable>
    )
}

export default React.memo(ButtonLink, arePropsEqual([]))
