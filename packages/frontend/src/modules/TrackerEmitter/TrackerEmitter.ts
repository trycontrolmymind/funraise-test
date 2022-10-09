import throttle from "lodash/throttle";

import { TrackerStorage, ITrackerStorage } from "../TrackerStorage";
import { ITrackEvent } from "../TrackEvent";
import { ITrackerEmitter } from "./ITrackerEmitter";
import { ITrackerTransport, TrackerTransport } from "../TrackerTransport";
import { Logger } from "../Logger";

/**
 * Call transport with debounce 1s, on unload
 */
export class TrackerEmitter implements ITrackerEmitter {
	private readonly storage: ITrackerStorage;
	private readonly transport: ITrackerTransport;
	private readonly logger = new Logger();

	private readonly timeout = 1000 as const;
	private readonly maxSize = 3 as const;

	constructor() {
		this.storage = new TrackerStorage();
		this.transport = new TrackerTransport();

		window.addEventListener('unload', () => {
			this.sendAllEventsUnload();
		});
	}

	/**
	 * Send event queue if it > maxSize or sendDebounced
	 *
	 * @param {ITrackEvent} event Event to track
	 */
	public addEvent(event: ITrackEvent) {
		this.storage.addEvent(event);
		if (this.storage.size() >= this.maxSize) {
			this.sendAllEvents();
			this.storage.clear();
		} else {
			this.sendDebounced();
		}
	}

	private sendDebounced = throttle(() => {
		this.sendAllEvents();
		this.storage.clear();
	}, this.timeout);

	private sendAllEvents() {
		const events = this.storage.getEvents();
		this.transport.send(events)
			.catch((err) => {
				this.logger.log(err);
				events.map(e => this.addEvent(e));
			});
	}

	private sendAllEventsUnload() {
		const events = this.storage.getEvents();
		const isSupported = this.transport.sendBeacon(events);

		if (isSupported) {
			this.storage.clear();
		} else {
			this.sendAllEvents();
		}
	}

}