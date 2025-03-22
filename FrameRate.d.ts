declare interface IFrameRateHIstorySettings {
	sampleRate?: number;
	filterStrength?: number;
	historyDuration?: number;
	onSample?: (history: Array<number>) => void;
}

export default class FrameRateHistory {
	constructor(schema: IFrameRateHIstorySettings);

	get fps(): number;

	get history(): Array<number>;

	filterStrength(value: number): this;
	filterStrength(): number;

	sampleRate(value: number): this;
	sampleRate(): number;

	onSample(callback: (history: Array<number>) => void): this;
	onSample(): (history: Array<number>) => void;

	historyDuration(value: number): this;
	historyDuration(): number;
}
