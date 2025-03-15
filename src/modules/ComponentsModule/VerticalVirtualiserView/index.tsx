import Heading from '#/components/Heading'
import VerticalVirtualiser from '#/components/VerticalVirtualiser.tsx'
import { FC, useMemo } from 'react'

const VerticalVirtualiserView: FC = () => {
    const data = useMemo(() => {
        return Array.from(Array(1000)).map((_, i) => {
            return {
                name: `Item ${i + 1}`,
            }
        })
    }, [])

    return (
        <div className="grid grid-rows-[max-content_minmax(0px,_100%)] w-full h-full overflow-hidden">
            <div className="p-4">
                <Heading rank="h2">VerticalVirtualiser</Heading>
                <p></p>
            </div>
            <div className="grid p-4 overflow-hidden">
                <VerticalVirtualiser<(typeof data)[number]>
                    minItemHeight={80}
                    items={data}
                    overscan={100}
                    renderItem={(data, index) => {
                        return (
                            <div key={index} className="flex p-2 h-full w-full">
                                <div className="rounded bg-primary-50 p-2 w-full">
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

export default VerticalVirtualiserView
