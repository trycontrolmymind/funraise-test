import { ITrackEvent } from "../TrackEvent";

export interface ITrackerStorage {
	addEvent(event: ITrackEvent): void;
	getEvents(): ITrackEvent[];
	size(): number;
	clear(): void;
}