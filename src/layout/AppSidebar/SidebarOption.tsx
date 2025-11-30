import { FC } from 'react'

interface ISidebarOptionProps {
    text: string
    onClick: () => void
}

const SidebarOption: FC<ISidebarOptionProps> = (props) => {
    const { onClick, text } = props
    return (
        <div className="flex items-center w-full p-2">
            <div
                className="py-2 px-4 w-full hover:bg-primary-100 rounded-md cursor-pointer"
                onClick={onClick}
            >
                {text}
            </div>
        </div>
    )
}

export default SidebarOption
