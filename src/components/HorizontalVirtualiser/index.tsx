import useResizeObserver from '#/hooks/useResizeObserver'
import { JSX, useMemo, useRef, useState } from 'react'
import { v4 } from 'uuid'

interface IHorizontalVirtualiserProps<D> {
    overscan: number
    minItemWidth: number
    items: D[]
    renderItem: (item: D, index: number) => JSX.Element
}

type FCType = <Data>(props: IHorizontalVirtualiserProps<Data>) => JSX.Element

const HorizontalVirtualiser: FCType = (props) => {
    const { overscan, items, minItemWidth, renderItem } = props

    const [scrollX, setScrollX] = useState<number>(0)

    const rootRef = useRef<HTMLDivElement>(null)

    const uniqueClass = useMemo(() => {
        return `virtualiser-${v4()}`
    }, [])

    const { width } = useResizeObserver(`.${uniqueClass}`)

    const itemCount = useMemo(() => {
        return items.length
    }, [items.length])

    const itemWidth = useMemo(() => {
        return Math.max(width / itemCount, minItemWidth)
    }, [itemCount, minItemWidth, width])

    const fullWidth = useMemo(() => {
        return itemCount * itemWidth
    }, [itemCount, itemWidth])

    const first = useMemo(() => {
        return Math.round(scrollX / itemWidth)
    }, [itemWidth, scrollX])

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
        return Math.round(width / itemWidth) + oStart + overscan
    }, [itemWidth, oStart, overscan, width])

    const renderedItems = useMemo(() => {
        return items.slice(firstItemIndex, firstItemIndex + renderedItemsCount)
    }, [firstItemIndex, items, renderedItemsCount])

    return (
        <div
            ref={rootRef}
            className={`${uniqueClass} h-full w-full overflow-auto`}
            onScroll={(event) => {
                const target = event.target as HTMLDivElement
                const { scrollLeft } = target
                setScrollX(scrollLeft)
            }}
        >
            <div
                className="flex h-full relative"
                style={{ width: `${fullWidth}px` }}
            >
                {/* <div
                    style={{ width: `${throttle(() => paddingLeft, 100)()}px` }}
                ></div> */}
                <div
                    className="flex h-full relative"
                    style={{
                        transform: `translateX(${firstItemIndex * itemWidth}px)`,
                    }}
                >
                    {renderedItems.map((item, i) => {
                        return (
                            <div
                                key={firstItemIndex + i}
                                className="h-full"
                                style={{
                                    width: `${itemWidth}px`,
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

export default HorizontalVirtualiser
