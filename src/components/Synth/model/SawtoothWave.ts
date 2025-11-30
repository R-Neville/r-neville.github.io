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

    public getImage(phaseOffsetRadians: number = 0): PeriodicWave {
        // Calculate coefficients for harmonics 1 to numberOfSamples - 1
        for (let k = 1; k < this.numberOfSamples; k++) {
            // Original sine coefficient for a falling sawtooth (based on user's formula interpretation)
            // Coefficient is 2.0 / (pi * k * (-1)^k)
            const originalSineCoefficient_Bk =
                2.0 / (Math.PI * k * Math.pow(-1, k))
            // const originalSineCoefficient_Bk = 2.0 * Math.pow(-1, k+1) / (Math.PI * k); // For rising sawtooth example

            // Calculate the phase angle for this harmonic
            const harmonicPhase = k * phaseOffsetRadians

            // Calculate the new cosine (real) and sine (imaginary) coefficients
            // Ak' = Ak * cos(k*phi) - Bk * sin(k*phi)
            // Bk' = Ak * sin(k*phi) + Bk * cos(k*phi)
            // Since the original wave only had sine terms (Ak = 0):
            // Ak' = -Bk * sin(k*phi)
            // Bk' = Bk * cos(k*phi)

            this.real[k] = -originalSineCoefficient_Bk * Math.sin(harmonicPhase)
            this.imag[k] = originalSineCoefficient_Bk * Math.cos(harmonicPhase)
        }

        // Create and return the PeriodicWave
        return this.context.createPeriodicWave(this.real, this.imag)
    }
}

export default SawtoothWave
