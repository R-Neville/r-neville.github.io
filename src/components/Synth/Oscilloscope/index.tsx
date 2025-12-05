import useBoundingRect from '#/hooks/useBoundingRect'
import arePropsEqual from '#/utils/arePropsEqual'
import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useSynthContext } from '../Context'

interface OscilloscopeProps {
    numberOfSamples: number
}

const CANVAS_HEIGHT = 120

const OscilloscopeComponent: FC<OscilloscopeProps> = () => {
    const { audioContext, synthesizer } = useSynthContext()

    const ref = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const { width } = useBoundingRect(ref)

    const drawWaveform = useCallback(() => {
        const canvas = canvasRef.current
        const c = canvas?.getContext('2d')
        const analyser = synthesizer?.analyzer
        const dataArray = new Uint8Array(analyser?.frequencyBinCount ?? 0)

        if (!c || !canvas || !audioContext || !synthesizer || !analyser) {
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
    }, [audioContext, synthesizer])

    useEffect(() => {
        drawWaveform()
    }, [audioContext, drawWaveform, synthesizer])

    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas?.getContext('2d')

        if (!c || !canvas) {
            return
        }
        c.fillStyle = '#2b4261'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.strokeStyle = '#cdd9ea'
        c.beginPath()
        c.moveTo(0, canvas.height / 2)
        c.lineTo(canvas.width, canvas.height / 2)
        c.stroke()
    }, [audioContext, synthesizer])

    return (
        <div ref={ref} className="w-full h-full bg-primary-800 p-2 rounded-md">
            <canvas
                ref={canvasRef}
                className="w-full bg-primary-800"
                height={CANVAS_HEIGHT}
                width={width}
            />
        </div>
    )
}

export const Oscilloscope = React.memo(OscilloscopeComponent, arePropsEqual([]))
