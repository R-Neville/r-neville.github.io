export interface IWaveForm {
    getImage(phaseOffsetRadians: number): PeriodicWave
}

export type WaveForm = new (
    context: AudioContext,
    numberOfSamples: number,
) => IWaveForm
