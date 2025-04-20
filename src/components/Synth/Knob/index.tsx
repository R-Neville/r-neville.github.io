import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, useState } from 'react'

interface KnobProps {
    label: string
    value: number
    onChange: (value: number) => void
}

const maxRotation = 270

const KnobComponent: FC<KnobProps> = ({ label, value, onChange }) => {
    const [rotation, setRotation] = useState(value)

    return (
        <div className="rounded-full flex flex-col gap-2 select-none">
            <div className="relative shadow-md rounded-full h-10 w-10">
                <div
                    className="relative rounded-full h-10 w-10 p-2 bg-white border border-primary-200 cursor-grab"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                    }}
                    onMouseDown={(event) => {
                        const startX = event.clientX

                        const controller = new AbortController()

                        const handleMouseMove = (event: MouseEvent) => {
                            const deltaX = event.clientX - startX
                            const newValue = Math.min(
                                Math.max(rotation + deltaX, 0),
                                maxRotation,
                            )
                            onChange(newValue / maxRotation)
                            setRotation(newValue)
                        }

                        const handleMouseUp = () => {
                            controller.abort()
                        }

                        window.addEventListener(
                            'mousemove',
                            handleMouseMove,
                            controller,
                        )
                        window.addEventListener(
                            'mouseup',
                            handleMouseUp,
                            controller,
                        )
                    }}
                >
                    <div className="absolute bottom-2 left-2 rounded-full h-1 w-1 bg-primary-400"></div>
                </div>
            </div>
            <div className="text-sm whitespace-nowrap">
                {label} {value}
            </div>
        </div>
    )
}

export const Knob = React.memo(KnobComponent, arePropsEqual(['onChange']))
