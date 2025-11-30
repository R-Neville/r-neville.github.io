import { RefObject, useEffect, useState } from 'react'

export default function useElementPosition<T extends HTMLElement>(
    ref: RefObject<T | null>,
) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const updatePosition = () => {
            if (ref.current) {
                const rect = ref.current?.getBoundingClientRect()
                setPosition({
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                })
            }
        }

        updatePosition()

        window.addEventListener('resize', updatePosition)

        return () => window.removeEventListener('resize', updatePosition)
    }, [ref])

    return position
}
