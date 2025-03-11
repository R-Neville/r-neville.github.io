import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'

interface IViewWrapperProps {
    children: React.ReactNode
    headerContent?: React.ReactNode
}

const ViewWrapper: FC<IViewWrapperProps> = (props) => {
    const { children, headerContent = null } = props

    let gridRows = 'grid-rows-[minmax(0px,_100%)]'
    if (headerContent !== null) {
        gridRows = 'grid-rows-[max-content_minmax(0px,_100%)]'
    }
    return (
        <div
            className={`grid ${gridRows} w-full overflow-hidden text-primary-800`}
        >
            {headerContent !== null && (
                <div className="flex w-full p-4">{headerContent}</div>
            )}
            <div className="flex flex-col p-4">{children}</div>
        </div>
    )
}

export default React.memo(ViewWrapper, arePropsEqual([]))
