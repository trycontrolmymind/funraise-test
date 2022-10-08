import { ITrackEvent } from "../TrackEvent";

export interface ITrackerEmitter {
	addEvent(event: ITrackEvent): void;
}