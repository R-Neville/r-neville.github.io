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
            <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                    <Heading rank="h2">HorizontalVirtualiser</Heading>
                </div>
                <p>
                    Try scrolling horizontally - this list contains 100000
                    items!
                </p>
            </div>
            <div className="p-4 h-full">
                <HorizontalVirtualiser<(typeof data)[number]>
                    minItemWidth={150}
                    items={data}
                    overscan={100}
                    renderItem={(data, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col h-full p-2"
                            >
                                <div className="rounded bg-primary-50 h-full p-2">
                                    {data.name}
                                </div>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default HorizontalVirtualiserView
