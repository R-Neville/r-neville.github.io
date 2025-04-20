export interface IWaveForm {
    getImage(): PeriodicWave
}

export type WaveForm = new (
    context: AudioContext,
    numberOfSamples: number,
) => IWaveForm
