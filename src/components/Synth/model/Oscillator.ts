import { v4 } from 'uuid'
import FrequencyGenerator from './FrequencyGenerator'
import { IWaveForm } from './IWaveForm'
import SawtoothWave from './SawtoothWave'

class Oscillator {
    private id: string
    private oscillators: OscillatorNode[]
    private noteGenerator: FrequencyGenerator
    private type: OscillatorType
    private context: AudioContext
    private waveForm: IWaveForm | null
    public voiceCount: number
    public detuneAmount: number
    public panAmount: number
    public analyzer: AnalyserNode

    constructor(
        context: AudioContext,
        type: OscillatorType,
        voiceCount: number = 1,
        detuneAmount: number = 1 / 100,
        panAmount: number = 1 / 16,
    ) {
        this.id = v4()
        this.oscillators = []
        this.noteGenerator = new FrequencyGenerator()
        this.context = context
        this.type = type
        this.voiceCount = voiceCount
        this.detuneAmount = detuneAmount
        this.panAmount = panAmount

        if (type === 'sawtooth') {
            this.waveForm = new SawtoothWave(context, 4096)
        } else {
            this.waveForm = null
        }

        this.analyzer = new AnalyserNode(context)
        this.analyzer.fftSize = 2048
        this.analyzer.connect(context.destination)
    }

    public getId() {
        return this.id
    }

    public getType() {
        return this.type
    }

    public setVoiceCount(count: number) {
        this.voiceCount = Math.max(1, count)
    }

    public setDetuneAmount(amount: number) {
        this.detuneAmount = Math.max(1 / 100, amount)
    }

    public setPanAmount(amount: number) {
        this.panAmount = Math.max(1 / 16, amount)
    }

    public getOscillator() {
        const oscillator = new OscillatorNode(this.context)
        if (this.waveForm !== null) {
            oscillator.setPeriodicWave(
                this.waveForm.getImage(Math.random() * ((2 * Math.PI) / 8)),
            )
        } else {
            oscillator.type = this.type
        }
        return oscillator
    }

    public applyPanning(oscillator: OscillatorNode, index: number) {
        const gainNode = new GainNode(this.context)
        gainNode.connect(this.analyzer)
        oscillator.connect(gainNode)
        const panNode = new StereoPannerNode(this.context)
        gainNode.connect(panNode)
        panNode.connect(this.context.destination)
        panNode.pan.value = -0.8 + index * this.panAmount
    }

    public applyDetune(oscillator: OscillatorNode, index: number) {
        const value = index * this.detuneAmount
        oscillator.detune.value = Math.max(1, value)
    }

    public attachAnalyzer(oscillator: OscillatorNode) {
        if (this.analyzer !== null) {
            oscillator.connect(this.analyzer)
        }
    }

    public getOscillators(frequency: number) {
        return Array.from({ length: this.voiceCount }, (_, i) => {
            const oscillator = this.getOscillator()
            this.applyPanning(oscillator, i)
            this.applyDetune(oscillator, i)
            oscillator.frequency.value = frequency
            return oscillator
        })
    }

    public playTone(keyIndex: number) {
        const frequency = this.noteGenerator.generateNote(keyIndex)
        this.oscillators = this.getOscillators(frequency).map(
            (oscillator, i) => {
                oscillator.connect(this.context.destination)
                oscillator.start(this.context.currentTime + i * 0.0001)
                return oscillator
            },
        )
    }

    public stopTone() {
        this.oscillators.forEach((oscillator) => {
            oscillator.stop()
            oscillator.disconnect()
        })
        this.oscillators = []
    }
}

export default Oscillator
