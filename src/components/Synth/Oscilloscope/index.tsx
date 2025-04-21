import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useSynthContext } from '../Context'

interface OscilloscopeProps {
    numberOfSamples: number
}

const OscilloscopeComponent: FC<OscilloscopeProps> = () => {
    const { audioContext, oscillator } = useSynthContext()

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const drawWaveform = useCallback(() => {
        const canvas = canvasRef.current
        const c = canvas?.getContext('2d')
        const analyser = oscillator?.analyzer
        const dataArray = new Uint8Array(analyser?.frequencyBinCount ?? 0)

        if (!c || !canvas || !audioContext || !oscillator || !analyser) {
            return
        }
        analyser.getByteTimeDomainData(dataArray)
        const segmentWidth = canvas.width / (analyser?.frequencyBinCount ?? 0)
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
        requestAnimationFrame(drawWaveform)
    }, [audioContext, oscillator])

    useEffect(() => {
        drawWaveform()
    }, [audioContext, drawWaveform, oscillator])

    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas?.getContext('2d')

        if (!c || !canvas) {
            return
        }
        c.fillStyle = '#000000'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.strokeStyle = 'limegreen'
        c.beginPath()
        c.moveTo(0, canvas.height / 2)
        c.lineTo(canvas.width, canvas.height / 2)
        c.stroke()
    }, [audioContext, oscillator])

    return (
        <div className="flex flex-col gap-2 p-2 rounded-md bg-black">
            <canvas className="rounded-md" ref={canvasRef} height={100} />
        </div>
    )
}

export const Oscilloscope = React.memo(OscilloscopeComponent, arePropsEqual([]))
