import { ILogger, Logger } from "../Logger";
import { TrackerEmitter } from "../TrackerEmitter/TrackerEmitter";
import { TrackEvent } from "../TrackEvent";
import { ITracker } from "./ITracker";

/**
 * Tracker allows to track events to backend
 */
export class Tracker implements ITracker {
	private readonly logger: ILogger = new Logger();

	private readonly trackerEmitter = new TrackerEmitter();

	/**
	 * Track events to backend
	 *
	 * @param {string} event Event Name to track
	 * @param {...string[]} tags Tags to track
	 */
	public track(event: string, ...tags: string[]) {
		if (!this.isInputValid(event, tags)) {
			this.logger.log(`Invalid input event and tags should be a strings`, `${{ event, tags }}`);
		}

		const trackEvent = new TrackEvent(event, tags);
		this.trackerEmitter.addEvent(trackEvent);

	}

	private isInputValid(event: string, tags: string[]) {
		if (typeof event !== "string") {
			return false;
		}

		return tags.every(tag => typeof tag === "string");
	}
}