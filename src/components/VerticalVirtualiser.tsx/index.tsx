import useResizeObserver from '#/hooks/useResizeObserver'
import { JSX, useMemo, useRef, useState } from 'react'
import { v4 } from 'uuid'

interface IVerticalVirtualiserProps<D> {
    overscan: number
    minItemHeight: number
    items: D[]
    renderItem: (item: D, index: number) => JSX.Element
}

type FCType = <Data>(props: IVerticalVirtualiserProps<Data>) => JSX.Element

const VerticalVirtualiser: FCType = (props) => {
    const { overscan, items, minItemHeight, renderItem } = props

    const [scrollY, setScrollY] = useState<number>(0)

    const rootRef = useRef<HTMLDivElement>(null)

    const uniqueClass = useMemo(() => {
        return `virtualiser-${v4()}`
    }, [])

    const { height } = useResizeObserver(`.${uniqueClass}`)

    const itemCount = useMemo(() => {
        return items.length
    }, [items.length])

    const itemHeight = useMemo(() => {
        return Math.max(height / itemCount, minItemHeight)
    }, [height, itemCount, minItemHeight])

    const fullHeight = useMemo(() => {
        return itemCount * itemHeight
    }, [itemCount, itemHeight])

    const first = useMemo(() => {
        return Math.round(scrollY / itemHeight)
    }, [itemHeight, scrollY])

    const oStart = useMemo(() => {
        if (first < overscan) {
            return first
        }
        return overscan
    }, [first, overscan])

    const firstItemIndex = useMemo(() => {
        return Math.max(0, first - oStart)
    }, [first, oStart])

    const renderedItemsCount = useMemo(() => {
        return Math.round(height / itemHeight) + oStart + overscan
    }, [itemHeight, oStart, overscan, height])

    const renderedItems = useMemo(() => {
        return items.slice(firstItemIndex, firstItemIndex + renderedItemsCount)
    }, [firstItemIndex, items, renderedItemsCount])

    return (
        <div
            ref={rootRef}
            className={`${uniqueClass} w-full overflow-auto`}
            onScroll={(event) => {
                const target = event.target as HTMLDivElement
                const { scrollTop } = target
                setScrollY(scrollTop)
            }}
        >
            <div className="w-full" style={{ height: `${fullHeight}px` }}>
                <div
                    className="w-full"
                    style={{
                        transform: `translateY(${firstItemIndex * itemHeight}px)`,
                    }}
                >
                    {renderedItems.map((item, i) => {
                        return (
                            <div
                                key={firstItemIndex + i}
                                className="w-full"
                                style={{
                                    height: `${itemHeight}px`,
                                }}
                            >
                                {renderItem(item, i)}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default VerticalVirtualiser
