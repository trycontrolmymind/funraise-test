import { ITrackPrevEvent } from "../TrackEvent/ITrackEvent"

export interface ITracker {
	track(event: string, ...tags: string[]): void

	prevEvents?: ITrackPrevEvent[]
}