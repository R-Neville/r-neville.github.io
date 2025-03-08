import useOnClickAwayClass from '#/hooks/useOnClickAwayClass'
import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, JSX, useState } from 'react'

export interface IPopoverMenuOption {
    text: string
    icon?: JSX.Element
    action: () => void
}

interface IPopoverMenuProps {
    minWidth: number
    trigger: JSX.Element
    options: IPopoverMenuOption[]
    placement: 'left' | 'right'
}

const PopoverMenu: FC<IPopoverMenuProps> = (props) => {
    const { trigger, options, placement, minWidth } = props

    const [open, setOpen] = useState<boolean>(false)

    const onClickAwayClass = useOnClickAwayClass(() => {
        setOpen(false)
    }, !open)

    return (
        <div
            className={`${onClickAwayClass} flex items-center relative w-full-h-full`}
        >
            <div
                className="flex items-center w-full h-full px-2 py-1"
                onClick={() => {
                    setOpen((prev) => !prev)
                }}
            >
                {trigger}
            </div>
            {open && (
                <div
                    className="absolute top-[calc(100%+10px)] flex flex-col w-fit bg-white border border-primary-100 rounded shadow z-50 select-none"
                    style={{
                        left: placement === 'right' ? '0px' : undefined,
                        right: placement === 'left' ? '0px' : undefined,
                        minWidth: `${minWidth}px`,
                    }}
                >
                    <div
                        className="absolute bottom-[100%] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary-100"
                        style={{
                            left: placement === 'right' ? '5px' : undefined,
                            right: placement === 'left' ? '5px' : undefined,
                        }}
                    ></div>
                    <div className="flex flex-col w-full">
                        {options.map((opt, i) => {
                            const { text, icon, action } = opt

                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-2 py-1 hover:bg-primary-50"
                                    onClick={() => {
                                        setOpen(false)
                                        action()
                                    }}
                                >
                                    {icon && icon}
                                    <div className="flex items-center">
                                        {text}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default React.memo(PopoverMenu, arePropsEqual<IPopoverMenuProps>([]))
