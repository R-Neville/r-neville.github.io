import { v4 } from 'uuid'
import FrequencyGenerator from './FrequencyGenerator'
import { IWaveForm } from './IWaveForm'

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
    public gainAmount: number
    public analyzer: AnalyserNode
    public mainGain: GainNode
    private merger: ChannelMergerNode

    constructor(
        context: AudioContext,
        type: OscillatorType,
        voiceCount: number = 1,
        detuneAmount: number = 1 / 100,
        panAmount: number = 1 / 16,
        gainAmount: number,
    ) {
        this.id = v4()
        this.oscillators = []
        this.noteGenerator = new FrequencyGenerator()
        this.context = context
        this.type = type
        this.voiceCount = voiceCount
        this.detuneAmount = detuneAmount
        this.panAmount = panAmount
        this.gainAmount = gainAmount

        // if (type === 'sawtooth') {
        //     this.waveForm = new SawtoothWave(context, 100)
        // } else {
        this.waveForm = null
        // }

        this.analyzer = new AnalyserNode(context)
        this.analyzer.fftSize = 2048
        this.analyzer.connect(context.destination)

        this.mainGain = context.createGain()
        this.mainGain.connect(this.analyzer)

        this.merger = context.createChannelMerger(2)
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
        this.detuneAmount = Math.max(1 / 10, amount)
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
        const MAX_DETUNE_CENTS = 5
        return Array.from({ length: this.voiceCount }, () => {
            const oscillator = this.getOscillator()
            const randomDetune =
                Math.random() * 2 * MAX_DETUNE_CENTS - MAX_DETUNE_CENTS
            oscillator.detune.setValueAtTime(
                randomDetune,
                this.context.currentTime,
            )
            oscillator.frequency.value = frequency
            return oscillator
        })
    }

    public playTone(keyIndex: number, octave = 4) {
        const frequency = this.noteGenerator.generateNote(
            keyIndex + octave * 12,
        )
        this.oscillators = this.getOscillators(frequency).map(
            (oscillator, i) => {
                this.connectGainAndPan(oscillator, i)
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

    public connectGainAndPan(oscillator: OscillatorNode, index: number) {
        const clampedMaxPan = Math.max(0, Math.min(1.0, this.panAmount))
        const basePan = (index / (this.oscillators.length - 1)) * 2 - 1.0
        const Pi = basePan * clampedMaxPan

        const GL = Math.cos(((Math.PI / 2) * (1 - Pi)) / 2)
        const GR = Math.sin(((Math.PI / 2) * (1 + Pi)) / 2)

        const [leftGain, leftPan] = this.getGainNodeWithPanner()
        const [rightGain, rightPan] = this.getGainNodeWithPanner()

        leftPan.pan.setValueAtTime(GL, this.context.currentTime)
        rightPan.pan.setValueAtTime(GR, this.context.currentTime)

        leftGain.gain.value = this.gainAmount
        rightGain.gain.value = this.gainAmount

        oscillator.connect(leftGain)
        oscillator.connect(rightGain)

        leftGain.connect(this.merger, 0, 0)
        rightGain.connect(this.merger, 0, 1)

        this.merger.connect(this.mainGain)
        this.mainGain.connect(this.context.destination)
        this.mainGain.gain.value = this.gainAmount
    }

    public getGainNodeWithPanner(): [GainNode, StereoPannerNode] {
        const gainNode = this.context.createGain()
        const panNode = this.context.createStereoPanner()
        panNode.connect(gainNode)
        return [gainNode, panNode]
    }
}

export default Oscillator
