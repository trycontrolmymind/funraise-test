import { ILogger, Logger } from "../Logger";
import { ITracker } from "./ITracker";

/**
 * Tracker allows to track events to backend
 */
export class Tracker implements ITracker {
	private readonly logger: ILogger = new Logger();

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
	}

	private isInputValid(event: string, tags: string[]) {
		if (typeof event !== "string") {
			return false;
		}

		return tags.every(tag => typeof tag === "string");
	}
}