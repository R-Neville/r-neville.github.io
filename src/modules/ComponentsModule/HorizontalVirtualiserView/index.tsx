import Heading from '#/components/Heading'
import HorizontalVirtualiser from '#/components/HorizontalVirtualiser'
import { FC, useMemo } from 'react'

const HorizontalVirtualiserView: FC = () => {
    const data = useMemo(() => {
        return Array.from(Array(100000)).map((_, i) => {
            return {
                name: `Item ${i + 1}`,
            }
        })
    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-4">
                <Heading rank="h2">HorizontalVirtualiser</Heading>
            </div>
            <div className="p-4 h-full">
                <div className="h-full border border-primary-100 rounded">
                    <HorizontalVirtualiser<(typeof data)[number]>
                        minItemWidth={150}
                        items={data}
                        overscan={100}
                        renderItem={(data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col p-2 h-full"
                                >
                                    <div className="h-full rounded bg-primary-50 p-2">
                                        {data.name}
                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default HorizontalVirtualiserView
