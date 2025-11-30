import { RefObject, useEffect, useState } from 'react'

export default function useBoundingRect<T extends HTMLElement>(
    ref: RefObject<T | null>,
) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (ref.current) {
                const rect = ref.current?.getBoundingClientRect()
                setPosition({
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                })
            }
        })

        if (ref.current !== null) {
            observer.observe(ref.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [ref])

    return position
}
