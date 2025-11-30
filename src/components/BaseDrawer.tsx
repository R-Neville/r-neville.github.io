import icons from '#/icons'
import React, { FC, useCallback, useEffect, useRef } from 'react'
import Button from './Button'
import Icon from './Icon'

interface IBaseDrawerProps {
    id?: string
    title: string
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    side?: 'left' | 'right'
    widthClass?: string
    footer?: React.ReactNode
}

const BaseDrawer: FC<IBaseDrawerProps> = ({
    id = 'app-drawer',
    title,
    isOpen,
    onClose,
    children,
    side = 'right',
    widthClass = 'w-80',
    footer,
}) => {
    const drawerRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        },
        [onClose],
    )

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            drawerRef.current?.focus()
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, handleKeyDown])

    const positionClasses = side === 'right' ? 'right-0' : 'left-0'
    const transformClasses =
        side === 'right'
            ? 'translate-x-full peer-checked:translate-x-0'
            : '-translate-x-full peer-checked:translate-x-0'

    if (!isOpen) {
        return null
    }

    return (
        <div
            aria-hidden={!isOpen}
            className="fixed inset-0 z-[999] bg-opacity-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                id={id}
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${id}-heading`}
                className={`fixed top-0 bottom-0 z-50 overflow-y-auto bg-white shadow-xl
                    transition-transform duration-300 ease-in-out
                    ${widthClass} ${positionClasses} ${
                        isOpen ? 'translate-x-0' : transformClasses
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full items-center">
                    <div className="flex justify-between items-center w-full p-4">
                        <div>{title}</div>
                        <Button theme="transparent" onClick={onClose}>
                            <Icon size="lg" icon={icons.times} />
                        </Button>
                    </div>
                    <div className="flex-grow w-full overflow-y-auto p-4">
                        {children}
                    </div>
                    {footer}
                </div>
            </div>
        </div>
    )
}

export default BaseDrawer
