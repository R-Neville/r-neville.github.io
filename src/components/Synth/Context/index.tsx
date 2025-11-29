import { createContext, useContext } from 'react'
import Oscillator from '../model/Oscillator'

interface SynthContextType {
    audioContext: AudioContext | null
    oscillator: Oscillator | null
    detuneAmount: number
    numberOfVoices: number
    panAmount: number
    type: OscillatorType
    setOscillator: (oscillator: Oscillator | null) => void
    setDetuneAmount: (detuneAmount: number) => void
    setNumberOfVoices: (numberOfVoices: number) => void
    setPanAmount: (panAmount: number) => void
    setType: (type: OscillatorType) => void
}

export const SynthContext = createContext<SynthContextType>(
    {} as SynthContextType,
)

export const useSynthContext = () => useContext(SynthContext)
