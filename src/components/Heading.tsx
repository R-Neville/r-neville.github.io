import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC } from 'react'

interface IHeadingProps {
    rank: 'h1' | 'h2' | 'h3' | 'h4'
    children: React.ReactNode
}

const Heading: FC<IHeadingProps> = (props) => {
    const { children, rank } = props

    const themeClassNames = 'text-primary-700 font-semibold'

    switch (rank) {
        case 'h1':
            return <h1 className={`${themeClassNames} text-xl`}>{children}</h1>
        case 'h2':
            return <h2 className={`${themeClassNames} text-lg`}>{children}</h2>
        case 'h3':
            return <h3 className={`${themeClassNames} text-md`}>{children}</h3>
        case 'h4':
            return <h4 className={`${themeClassNames} text-sm`}>{children}</h4>
    }
}

export default React.memo(Heading, arePropsEqual([]))
