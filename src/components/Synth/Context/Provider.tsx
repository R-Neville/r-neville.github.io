import { useMemo, useState } from 'react'
import { SynthContext } from '.'
import Oscillator from '../model/Oscillator'

const SynthProvider = ({ children }: { children: React.ReactNode }) => {
    const [detuneAmount, setDetuneAmount] = useState<number>(0)
    const [numberOfVoices, setNumberOfVoices] = useState<number>(1)
    const [panAmount, setPanAmount] = useState<number>(0)
    const [type, setType] = useState<OscillatorType>('sine')
    const [oscillator, setOscillator] = useState<Oscillator | null>(null)

    const audioContext = useMemo(() => new AudioContext(), [])

    return (
        <SynthContext.Provider
            value={{
                audioContext,
                oscillator,
                detuneAmount,
                numberOfVoices,
                panAmount,
                type,
                setOscillator,
                setDetuneAmount,
                setNumberOfVoices,
                setPanAmount,
                setType,
            }}
        >
            {children}
        </SynthContext.Provider>
    )
}

export { SynthProvider }
