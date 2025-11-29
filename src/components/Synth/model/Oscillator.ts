import { v4 } from 'uuid'
import NoteGenerator from './NoteGenerator'

class Oscillator {
    private id: string
    private oscillator: OscillatorNode | null
    private noteGenerator: NoteGenerator
    private type: OscillatorType
    private context: AudioContext

    constructor(context: AudioContext, type: OscillatorType) {
        this.id = v4()
        this.oscillator = null
        this.noteGenerator = new NoteGenerator()
        this.type = type
        this.context = context
    }

    public getId() {
        return this.id
    }

    public getType() {
        return this.type
    }

    public getOscillator() {
        const oscillator = new OscillatorNode(this.context)
        oscillator.type = this.type
        return oscillator
    }

    public playTone(keyIndex: number, octave: number) {
        this.oscillator = this.getOscillator()
        this.oscillator.frequency.value = this.noteGenerator.generateNote(
            keyIndex + octave * 12,
        )
        this.oscillator.connect(this.context.destination)
        this.oscillator.start()
    }

    public stopTone() {
        this.oscillator?.stop()
        this.oscillator?.disconnect()
        this.oscillator = null
    }
}

export default Oscillator
