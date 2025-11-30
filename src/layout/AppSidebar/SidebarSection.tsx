import Icon from '#/components/Icon'
import icons from '#/icons'
import { FC, useState } from 'react'

interface ISidebarSectonProps {
    title: string
    children: React.ReactNode
}

const SidebarSection: FC<ISidebarSectonProps> = (props) => {
    const { title, children } = props
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-col">
            <div
                className="flex items-center justify-between rounded-md py-2 px-4 bg-primary-100 cursor-pointer"
                onClick={() => {
                    setOpen((prev) => !prev)
                }}
            >
                <div className="text-lg">{title}</div>
                {!open && <Icon icon={icons.chevronLeft} />}
                {open && <Icon icon={icons.chevronDown} />}
            </div>
            {open && <div>{children}</div>}
        </div>
    )
}

export default SidebarSection
