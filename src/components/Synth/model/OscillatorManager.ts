import Oscillator from './Oscillator'

const MAX_OSCILLATORS = 3

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
