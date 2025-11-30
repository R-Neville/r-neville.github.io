import Oscillator from './Oscillator'

class OscillatorManager {
    private oscillators: Oscillator[] = []

    constructor() {
        this.oscillators = []
    }

    public addOscillator(oscillator: Oscillator) {
        this.oscillators.push(oscillator)
    }
}

export default OscillatorManager
