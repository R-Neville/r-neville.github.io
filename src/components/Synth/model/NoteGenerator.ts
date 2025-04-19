class NoteGenerator {
    private readonly referenceIndex = 49
    private readonly referenceFrequency = 440

    constructor() {}

    generateNote(keyIndex: number): number {
        // f(n) = 440 × (2^(n-49)/12) Hz
        const noteIndex = keyIndex
        return (
            this.referenceFrequency *
            Math.pow(2, (noteIndex - this.referenceIndex) / 12)
        )
    }
}

export default NoteGenerator
