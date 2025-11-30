import { useEffect, useState } from 'react'

export default function useResizeObserver(selector: string) {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        const element = document.querySelector(selector)

        const observer = new ResizeObserver(() => {
            if (element !== null) {
                const { width, height } = element.getBoundingClientRect()
                setWidth(width)
                setHeight(height)
            }
        })

        if (element !== null) {
            observer.observe(element)
        }

        return () => {
            observer.disconnect()
        }
    }, [selector])

    return { height, width }
}
