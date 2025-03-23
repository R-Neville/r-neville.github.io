import Icon from '#/components/Icon'
import icons from '#/icons'
import arePropsEqual from '#/utils/arePropsEqual'
import React from 'react'

interface IComponentCardProps {
    title: string
    children?: React.ReactNode
    description: string
    onClick: () => void
}

const _ComponentCard = (props: IComponentCardProps) => {
    const { title, description, children, onClick } = props

    return (
        <div
            className="flex flex-col gap-2 rounded border border-primary-100 bg-primary-50 shadow p-2 min-w-0 overflow-hidden hover:shadow-md cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center gap-2 p-2">
                <div className="font-semibold ">{title}</div>
                <Icon icon={icons.arrowRight} />
                <div className="italic">{description}</div>
            </div>
            {children !== undefined && <div className="p-2">{children}</div>}
        </div>
    )
}

const ComponentCard = React.memo(_ComponentCard, arePropsEqual([]))

export default ComponentCard
