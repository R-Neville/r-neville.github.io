export interface ADSREnvelope {
    attack: number
    decay: number
    sustain: number
    release: number
}

class VolumeEnvelope {
    constructor(
        private readonly context: AudioContext,
        private readonly envelope: ADSREnvelope,
    ) {}

    public attack(gainNodes: GainNode[], fullGain: number) {
        const now = this.context.currentTime // Key pressed
        const end = now + this.envelope.attack
        gainNodes.forEach((node) => {
            node.gain.setValueAtTime(0, now)
            node.gain.linearRampToValueAtTime(fullGain, end)
            node.gain.setTargetAtTime(fullGain, end, this.envelope.decay)
        })
        return end
    }

    public release(gainNodes: GainNode[]) {
        const now = this.context.currentTime // Key released
        const end = now + this.envelope.release
        gainNodes.forEach((node) => {
            node.gain.cancelScheduledValues(now)
            node.gain.setValueAtTime(node.gain.value, now)
            node.gain.linearRampToValueAtTime(0, end)
        })
        return end
    }
}

export default VolumeEnvelope
