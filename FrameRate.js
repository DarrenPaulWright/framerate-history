const MILLISECONDS_IN_SECOND = 1000;

const ON_SAMPLE = Symbol();

/**
 * @name Installation
 * @summary
 *
 * ```
 * npm install framerate-history
 * ```
 */

/**
 * @category 2
 * @class FrameRate
 * @summary
 *
 * ``` javascript
 * import FrameRate from 'framerate-history';
 * ```
 *
 * @arg {Object} settings
 * @arg {Function} [settings.onSample]
 * @arg {Number} [settings.filterStrength=5]
 * @arg {Number} [settings.historyDuration=30]
 * @arg {Number} [settings.sampleRate=10]
 */
export default class FrameRate {
	#history = [];
	#fps = 0;
	#filterStrength = 5;
	#historyDuration = 30;
	#sampleRate = 10;
	#sampleInterval = 0;
	#onSample = null;

	constructor(settings) {
		let frameTime = 0;
		let lastLoop = performance.now();

		this.onSample(settings.onSample);
		this.filterStrength(settings.filterStrength || 5);
		this.historyDuration(settings.historyDuration || 30);
		this.sampleRate(settings.sampleRate || 10);

		const refreshLoop = () => {
			window.requestAnimationFrame((now) => {
				frameTime += (now - lastLoop - frameTime) / this.#filterStrength;
				lastLoop = now;
				this.#fps = Math.round(MILLISECONDS_IN_SECOND / frameTime);
				refreshLoop();
			});
		};

		refreshLoop();
	}

	/**
	 * The last recorded FPS
	 *
	 * @memberOf FrameRate
	 * @instance
	 * @readonly
	 *
	 * @returns {Number}
	 */
	get fps() {
		return this.#fps;
	}

	/**
	 * The FPS recordings over the history duration
	 *
	 * @memberOf FrameRate
	 * @instance
	 * @readonly
	 *
	 * @returns {Array}
	 */
	get history() {
		return this.#history;
	}

	/**
	 * Sets a filter on the frame rate calculation. Setting to 1 will effectively turn off the filter, the higher the
	 * number the more smooth the curve over time. See this stackoverflow question for details:
	 * https://stackoverflow.com/questions/4787431/check-fps-in-js
	 *
	 * @default 5
	 * @memberOf FrameRate
	 * @chainable
	 * @instance
	 *
	 * @arg {Number} [value]
	 *
	 * @returns {Number}
	 */
	filterStrength(value) {
		if (typeof value === 'number') {
			this.#filterStrength = value;

			return this;
		}

		return this.#filterStrength;
	}

	/**
	 * The rate to take samples. Setting to 0 will clear the interval. If the interval is prevented from executing at the desired rate, the history will get filled in with the current frame rate in an attempt to keep the history as accurate as possible.
	 *
	 * @default 10
	 * @memberOf FrameRate
	 * @chainable
	 * @instance
	 *
	 * @arg {Number} [value] - Samples per second
	 *
	 * @returns {Number}
	 */
	sampleRate(value) {
		let lastSample;
		let now;

		if (typeof value === 'number') {
			const DURATION = MILLISECONDS_IN_SECOND / value;
			this.#sampleRate = value;
			this.historyDuration(this.historyDuration());
			lastSample = performance.now();

			clearInterval(this.#sampleInterval);

			if (this.#sampleRate && this.historyDuration()) {
				this.#sampleInterval = setInterval(() => {
					now = performance.now();

					while (lastSample + DURATION < now) {
						this.#history.push(this.#fps);
						this.#history.shift();
						lastSample += DURATION;
					}

					if (this.#onSample) {
						this.#onSample(this.#history);
					}
				}, DURATION);
			}

			return this;
		}

		return this.#sampleRate;
	}

	/**
	 * The callback will get called for every sample taken.
	 *
	 * @memberOf FrameRate
	 * @chainable
	 * @instance
	 *
	 * @arg {Function} [callback] - The callback is given one param, the FPS history array.
	 *
	 * @returns {Function}
	 */
	onSample(callback) {
		if (typeof callback === 'function') {
			this.#onSample = callback;

			return this;
		}

		return this.#onSample;
	}

	/**
	 * Defines the duration of tracked history.
	 *
	 * @default 30
	 * @memberOf FrameRate
	 * @chainable
	 * @instance
	 *
	 * @arg {Number} [value] - Seconds
	 *
	 * @returns {Number}
	 */
	historyDuration(value) {
		if (value !== undefined) {
			this.#historyDuration = value;
			const totalHistory = this.#sampleRate * this.#historyDuration;

			while (this.#history.length < totalHistory) {
				this.#history.unshift(0);
			}
			while (this.#history.length > totalHistory) {
				this.#history.shift();
			}

			return this;
		}

		return this.#historyDuration;
	}
}
