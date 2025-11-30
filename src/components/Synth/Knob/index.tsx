import arePropsEqual from '#/utils/arePropsEqual'
import React, {
    FC,
    MouseEvent as ReactMouseEvent,
    TouchEvent as ReactTouchEvent,
    useState,
} from 'react'

interface KnobProps {
    numberOfSteps: number
    label: string
    value: number
    displayValue: string
    onChange: (value: number) => void
}

const maxRotation = 270

const KnobComponent: FC<KnobProps> = ({
    label,
    value,
    onChange,
    numberOfSteps,
    displayValue,
}) => {
    const [rotation, setRotation] = useState(value)

    const onMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
        const startX = event.clientX

        const controller = new AbortController()

        const handleMouseMove = (event: MouseEvent) => {
            const deltaX = event.clientX - startX
            const newValue = Math.min(
                Math.max(rotation + deltaX, 0),
                maxRotation,
            )
            const step = Math.round((newValue / maxRotation) * numberOfSteps)
            onChange(step)
            setRotation(newValue)
        }

        const handleMouseUp = () => {
            controller.abort()
        }

        window.addEventListener('mousemove', handleMouseMove, controller)
        window.addEventListener('mouseup', handleMouseUp, controller)
    }

    const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
        const startX = event.touches[0].clientX

        const controller = new AbortController()

        const handleTouchMove = (event: TouchEvent) => {
            const deltaX = event.touches[0].clientX - startX
            const newValue = Math.min(
                Math.max(rotation + deltaX, 0),
                maxRotation,
            )
            const step = Math.round((newValue / maxRotation) * numberOfSteps)
            onChange(step)
            setRotation(newValue)
        }

        const handleTouchEnd = () => {
            controller.abort()
        }

        window.addEventListener('touchmove', handleTouchMove, controller)
        window.addEventListener('touchend', handleTouchEnd, controller)
    }

    return (
        <div className="flex flex-col items-center bg-primary-800 gap-2 p-2 select-none rounded border border-primary-600">
            <div className="text-primary-200">{label}</div>
            <div className="relative shadow-md flex items-center justify-center rounded-full h-12 w-12 bg-primary-500">
                <div
                    className="relative rounded-full h-10 w-10 p-2 bg-white border border-primary-200 cursor-grab"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                    }}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                >
                    <div className="absolute bottom-2 left-2 rounded-full h-1 w-1 bg-primary-800"></div>
                </div>
            </div>
            <div className="flex items-center justify-center text-sm whitespace-nowrap text-primary-200">
                {displayValue}
            </div>
        </div>
    )
}

export const Knob = React.memo(KnobComponent, arePropsEqual(['onChange']))
