import { v4 } from 'uuid'
import FrequencyGenerator from './FrequencyGenerator'
import { IWaveForm } from './IWaveForm'
import SawtoothWave from './SawtoothWave'
import VolumeEnvelope, { ADSREnvelope } from './VolumeEnvelope'

class Synthesizer {
    private id: string
    private oscillators: Array<{
        leftGain: GainNode
        rightGain: GainNode
        oscillator: OscillatorNode
    }>
    private noteGenerator: FrequencyGenerator
    private type: OscillatorType
    private context: AudioContext
    private waveForm: IWaveForm | null
    public voiceCount: number
    public detuneAmount: number
    public panAmount: number
    public gainAmount: number
    public analyzer: AnalyserNode
    private merger: ChannelMergerNode
    private adsr: ADSREnvelope

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

        if (type === 'sawtooth') {
            this.waveForm = new SawtoothWave(context, 100)
        } else {
            this.waveForm = null
        }

        this.analyzer = new AnalyserNode(context)
        this.analyzer.fftSize = 2048
        this.analyzer.connect(context.destination)

        this.merger = context.createChannelMerger(2)
        this.merger.connect(context.destination)
        this.merger.connect(this.analyzer)

        this.adsr = {
            attack: 0.1,
            decay: 0.1,
            sustain: 0,
            release: 0.5,
        }
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
        const oscillator = this.context.createOscillator()
        if (this.waveForm !== null) {
            oscillator.setPeriodicWave(
                this.waveForm.getImage(Math.random() * ((2 * Math.PI) / 8)),
            )
        } else {
            oscillator.type = this.type
        }
        return oscillator
    }

    public getVolumeEnvelope() {
        return new VolumeEnvelope(this.context, this.adsr)
    }

    public attachAnalyzer(oscillator: OscillatorNode) {
        if (this.analyzer !== null) {
            oscillator.connect(this.analyzer)
        }
    }

    public getOscillators(frequency: number) {
        return Array.from({ length: this.voiceCount }, () => {
            const oscillator = this.getOscillator()
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
                this.applyDetune(oscillator, i)
                const [leftGain, rightGain] = this.connectGainAndPan(
                    oscillator,
                    i,
                )
                this.getVolumeEnvelope().attack(
                    [leftGain, rightGain],
                    this.gainAmount,
                )
                oscillator.start()
                return {
                    leftGain,
                    rightGain,
                    oscillator,
                }
            },
        )
    }

    public stopTone() {
        this.oscillators.forEach((osc) => {
            const { leftGain, rightGain, oscillator } = osc
            this.getVolumeEnvelope().release([leftGain, rightGain])
            setTimeout(() => {
                oscillator.stop()
                oscillator.disconnect()
                console.log('done')
            }, this.adsr.release * 1000)
        })
        this.oscillators = []
    }

    public applyDetune(oscillator: OscillatorNode, index: number) {
        let value = 0
        if (index === 0) {
            value = 0
        } else {
            const step = Math.ceil(index / 2)
            const stepSize = this.detuneAmount / Math.ceil(this.voiceCount / 2)
            const amount = step * stepSize
            const sign = index % 2 !== 0 ? 1 : -1
            value = sign * amount
        }
        oscillator.detune.setValueAtTime(value, this.context.currentTime)
    }

    public connectGainAndPan(
        oscillator: OscillatorNode,
        index: number,
    ): [GainNode, GainNode] {
        const [leftGain, leftPan] = this.getGainNodeWithPanner(oscillator)
        const [rightGain, rightPan] = this.getGainNodeWithPanner(oscillator)

        const panValue = this.calculatePan(index)

        if (panValue !== 0) {
            if (panValue < 0) {
                leftPan.pan.setValueAtTime(panValue, this.context.currentTime)
            }
            if (panValue > 0) {
                rightPan.pan.setValueAtTime(panValue, this.context.currentTime)
            }
        }

        leftGain.connect(this.merger, 0, 0)
        rightGain.connect(this.merger, 0, 1)

        return [leftGain, rightGain]
    }

    public getGainNodeWithPanner(
        oscillator: OscillatorNode,
    ): [GainNode, StereoPannerNode] {
        const gainNode = this.context.createGain()
        const panNode = this.context.createStereoPanner()
        oscillator.connect(panNode)
        panNode.connect(gainNode)
        return [gainNode, panNode]
    }

    public calculatePan(index: number) {
        const clampedMaxPan = Math.max(0, Math.min(1.0, this.panAmount / 100))
        let basePan = 0
        if (this.voiceCount > 2) {
            basePan = -1 + (index / (this.voiceCount - 1)) * 2
        }
        return basePan * clampedMaxPan
    }
}

export default Synthesizer
