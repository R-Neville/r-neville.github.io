import useOnClickAwayClass from '#/hooks/useOnClickAwayClass'
import icons from '#/icons'
import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, JSX } from 'react'
import Clickable from './Clickable'
import Icon from './Icon'

interface IBaseModalProps {
    open: boolean
    clickAwayable?: boolean
    handleClose: () => void
    title: JSX.Element
    footer?: JSX.Element
    children: React.ReactNode
    dialogClassName?: string
}

const BaseModal: FC<IBaseModalProps> = (props: IBaseModalProps) => {
    const {
        open,
        clickAwayable,
        handleClose,
        title,
        footer,
        children,
        dialogClassName,
    } = props

    const clickAwayClass = useOnClickAwayClass(handleClose, open)

    if (!open) {
        return <></>
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-[999] bg-black/20">
            <div
                className={`${dialogClassName !== undefined ? dialogClassName : ''}`}
            >
                <div
                    className={`${clickAwayable ? clickAwayClass : ''} flex flex-col relative h-full overflow-hidden rounded border border-primary-100 shadow text-primary-800 bg-white`}
                >
                    <div className="flex items-center justify-between p-2">
                        {title}
                        <Clickable onClick={handleClose}>
                            <Icon icon={icons.xMark} size="lg" />
                        </Clickable>
                    </div>

                    <div className="flex flex-col p-4 overflow-auto">
                        {children}
                    </div>
                    {footer !== undefined && footer}
                </div>
            </div>
        </div>
    )
}

export default React.memo(BaseModal, arePropsEqual([]))
