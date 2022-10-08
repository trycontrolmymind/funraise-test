import { ITrackEvent } from "../TrackEvent";
import { ITrackerStorage } from "./ITrackerStorage";

/**
 * Storage that collect all the events
 */
export class TrackerStorage implements ITrackerStorage {
	// TODO: Probably we should think about save events in localStorage
	private storage: ITrackEvent[] = [];

	public addEvent(event: ITrackEvent): void {
		this.storage.push(event);
	}

	public getEvents(): ITrackEvent[] {
		return this.storage;
	}

	public size(): number {
		return this.storage.length;
	}

	public clear() {
		this.storage = [];
	}
}