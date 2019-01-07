const MILLISECONDS_IN_SECOND = 1000;

const FILTER_STRENGTH = Symbol();
const SAMPLE_RATE = Symbol();
const HISTORY_DURATION = Symbol();
const FPS = Symbol();
const HISTORY = Symbol();
const SAMPLE_INTERVAL = Symbol();
const ON_SAMPLE = Symbol();

/**
 * ### Usage
 * ```
 * import FrameRate from 'framerate-history';
 * ```
 *
 * @module FrameRate
 *
 * @param {Object} settings
 * @param {Function} [settings.onSample]
 * @param {Number} [settings.filterStrength=5]
 * @param {Number} [settings.historyDuration=30]
 * @param {Number} [settings.sampleRate=10]
 */
export default class FrameRate {
	constructor(settings) {
		const self = this;
		let frameTime = 0;
		let lastLoop = performance.now();

		self[HISTORY] = [];

		self.onSample(settings.onSample);
		self.filterStrength(settings.filterStrength || 5);
		self.historyDuration(settings.historyDuration || 30);
		self.sampleRate(settings.sampleRate || 10);

		const refreshLoop = () => {
			window.requestAnimationFrame((now) => {
				frameTime += (now - lastLoop - frameTime) / self[FILTER_STRENGTH];
				lastLoop = now;
				self[FPS] = Math.round(MILLISECONDS_IN_SECOND / frameTime);
				refreshLoop();
			});
		};

		refreshLoop();
	}

	/**
	 * @type {number}
	 */
	get fps() {
		return this[FPS];
	}

	/**
	 * @type {array}
	 */
	get history() {
		return this[HISTORY];
	}

	/**
	 * Sets a filter on the frame rate calculation. Setting to 1 will effectively turn off the filter, the higher the
	 * number the more smooth the curve over time. See this stackoverflow question for details:
	 * https://stackoverflow.com/questions/4787431/check-fps-in-js
	 *
	 * @method filterStrength
	 * @instance
	 *
	 * @param {Number} [value]
	 *
	 * @returns {frameRate|Number}
	 */
	filterStrength(value) {
		const self = this;

		if (value !== undefined) {
			self[FILTER_STRENGTH] = value;

			return self;
		}

		return self[FILTER_STRENGTH];
	}

	/**
	 * The rate to take samples. Setting to 0 will clear the interval. If the interval is prevented from executing at the desired rate, the history will get filled in with the current frame rate in an attempt to keep the history as accurate as possible.
	 *
	 * @method sampleRate
	 * @instance
	 *
	 * @param {Number} [value] - Samples per second
	 *
	 * @returns {frameRate|Number}
	 */
	sampleRate(value) {
		const self = this;
		let lastSample;
		let now;

		if (value !== undefined) {
			const DURATION =  MILLISECONDS_IN_SECOND / value;
			self[SAMPLE_RATE] = value;
			self.historyDuration(self.historyDuration());
			lastSample = performance.now();

			clearInterval(self[SAMPLE_INTERVAL]);

			if (self[SAMPLE_RATE] && self.historyDuration()) {
				self[SAMPLE_INTERVAL] = setInterval(() => {
					now = performance.now();

					while (lastSample + DURATION < now) {
						self[HISTORY].push(self[FPS]);
						self[HISTORY].shift();
						lastSample += DURATION;
					}

					if (self[ON_SAMPLE]) {
						self[ON_SAMPLE](self[HISTORY]);
					}
				}, DURATION);
			}

			return self;
		}

		return self[SAMPLE_RATE];
	}

	/**
	 * The callback will get called for every sample taken.
	 *
	 * @method onSample
	 * @instance
	 *
	 * @param {Function} [callback]
	 *
	 * @return {frameRate|Function}
	 */
	onSample(callback) {
		const self = this;

		if (callback !== undefined) {
			self[ON_SAMPLE] = callback;

			return self;
		}

		return self[ON_SAMPLE];
	}

	/**
	 * Defines the duration of tracked history in seconds.
	 *
	 * @method historyDuration
	 * @instance
	 *
	 * @param {Number} [value] - Seconds
	 *
	 * @returns {frameRate|Number}
	 */
	historyDuration(value) {
		const self = this;

		if (value !== undefined) {
			self[HISTORY_DURATION] = value;
			const totalHistory = self[SAMPLE_RATE] * self[HISTORY_DURATION];

			while (self[HISTORY].length < totalHistory) {
				self[HISTORY].unshift(0);
			}
			while (self[HISTORY].length > totalHistory) {
				self[HISTORY].shift();
			}

			return self;
		}

		return self[HISTORY_DURATION];
	}
}
