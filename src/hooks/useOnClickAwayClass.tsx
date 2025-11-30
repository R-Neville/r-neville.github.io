import { useEffect, useMemo } from 'react'
import { v4 } from 'uuid'

export default function useOnClickAwayClass(
    action: () => void,
    ignore: boolean,
) {
    const uniqueClass = useMemo(() => {
        return `clickAwayable-${v4()}`
    }, [])

    useEffect(() => {
        const onClickAway = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!ignore && target.closest(`.${uniqueClass}`) === null) {
                action()
            }
        }

        document.addEventListener('click', onClickAway)

        return () => {
            document.removeEventListener('click', onClickAway)
        }
    }, [action, ignore, uniqueClass])

    return uniqueClass
}
