import { createContext, useContext } from 'react'
import Synthesizer from '../model/Synthesizer'

interface SynthContextType {
    audioContext: AudioContext | null
    synthesizer: Synthesizer | null
    octave: number
    detuneAmount: number
    numberOfVoices: number
    panAmount: number
    type: OscillatorType
    setSynthesizer: (synth: Synthesizer | null) => void
    setDetuneAmount: (detuneAmount: number) => void
    setNumberOfVoices: (numberOfVoices: number) => void
    setPanAmount: (panAmount: number) => void
    setType: (type: OscillatorType) => void
    setOctave: (octave: number) => void
    setGain: (value: number) => void
    gain: number
}

export const SynthContext = createContext<SynthContextType>(
    {} as SynthContextType,
)

export const useSynthContext = () => useContext(SynthContext)
