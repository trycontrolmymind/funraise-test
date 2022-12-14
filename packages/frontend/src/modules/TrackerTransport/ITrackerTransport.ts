import { ITrackEvent } from "../TrackEvent";

export interface ITrackerTransport {
	send(events: ITrackEvent[]): Promise<void>;
	sendBeacon(events: ITrackEvent[]): boolean;
}