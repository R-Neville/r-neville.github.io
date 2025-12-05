import { useCallback, useMemo, useState } from 'react'
import { SynthContext } from '.'
import Synthesizer from '../model/Synthesizer'

const SynthProvider = ({ children }: { children: React.ReactNode }) => {
    const [detuneAmount, _setDetuneAmount] = useState<number>(0)
    const [numberOfVoices, _setNumberOfVoices] = useState<number>(1)
    const [panAmount, setPanAmount] = useState<number>(0)
    const [type, setType] = useState<OscillatorType>('sine')
    const [synthesizer, setSynthesizer] = useState<Synthesizer | null>(null)
    const [octave, _setOctave] = useState<number>(4)
    const [gain, _setGain] = useState<number>(0.5)

    const audioContext = useMemo(() => new AudioContext(), [])

    const setGain = useCallback((value: number) => {
        _setGain(Math.max(Math.min(1, value), 0))
    }, [])

    const setDetuneAmount = useCallback((detuneAmount: number) => {
        _setDetuneAmount(Math.max(Math.min(100, detuneAmount), 0))
    }, [])

    const setNumberOfVoices = useCallback((numberOfVoices: number) => {
        _setNumberOfVoices(Math.max(Math.min(16, numberOfVoices), 1))
    }, [])

    const setOctave = useCallback((octave: number) => {
        const rounded = Math.round(octave)
        const newValue = Math.max(Math.min(rounded, 6), 0)
        _setOctave(newValue)
    }, [])

    return (
        <SynthContext.Provider
            value={{
                audioContext,
                synthesizer,
                detuneAmount,
                numberOfVoices,
                panAmount,
                type,
                setSynthesizer,
                setDetuneAmount,
                setNumberOfVoices,
                setPanAmount,
                setType,
                octave,
                setOctave,
                setGain,
                gain,
            }}
        >
            {children}
        </SynthContext.Provider>
    )
}

export { SynthProvider }
