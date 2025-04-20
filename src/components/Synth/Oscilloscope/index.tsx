import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, useEffect, useRef } from 'react'
import { useSynthContext } from '../Context'

interface OscilloscopeProps {
    numberOfSamples: number
}

const OscilloscopeComponent: FC<OscilloscopeProps> = () => {
    const { audioContext, oscillator } = useSynthContext()

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas?.getContext('2d')
        const analyser = oscillator?.analyzer
        const dataArray = new Uint8Array(analyser?.frequencyBinCount ?? 0)

        if (!c || !canvas || !audioContext || !oscillator || !analyser) {
            return
        }

        c.fillStyle = '#181818'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.strokeStyle = '#33ee55'
        c.beginPath()
        c.moveTo(0, canvas.height / 2)
        c.lineTo(canvas.width, canvas.height / 2)
        c.stroke()

        const draw = () => {
            analyser.getByteTimeDomainData(dataArray)
            const segmentWidth =
                canvas.width / (analyser?.frequencyBinCount ?? 0)
            c.fillRect(0, 0, canvas.width, canvas.height)
            c.beginPath()
            c.moveTo(-100, canvas.height / 2)
            for (let i = 1; i < analyser.frequencyBinCount; i += 1) {
                const x = i * segmentWidth
                const v = dataArray[i] / 128.0
                const y = (v * canvas.height) / 2
                c.lineTo(x, y)
            }
            c.lineTo(canvas.width + 100, canvas.height / 2)
            c.stroke()
            requestAnimationFrame(draw)
        }
        draw()
    }, [audioContext, oscillator])

    return <canvas ref={canvasRef} height={200} />
}

export const Oscilloscope = React.memo(OscilloscopeComponent, arePropsEqual([]))
