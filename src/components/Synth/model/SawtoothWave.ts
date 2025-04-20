import { IWaveForm } from './IWaveForm'

class SawtoothWave implements IWaveForm {
    private real: Float32Array
    private imag: Float32Array
    private numberOfSamples: number
    private context: AudioContext

    constructor(context: AudioContext, numberOfSamples: number) {
        this.context = context
        this.numberOfSamples = numberOfSamples
        this.real = new Float32Array(numberOfSamples)
        this.imag = new Float32Array(numberOfSamples)
    }

    public getImage() {
        Array.from({ length: this.numberOfSamples }).forEach((_, index) => {
            const x = index + 1
            this.imag[index] = 2.0 / (Math.pow(-1, x) * Math.PI * x)
        })

        return this.context.createPeriodicWave(this.real, this.imag)
    }
}

export default SawtoothWave
