import { ITracker, Tracker } from "./modules/Tracker";
import { ITrackPrevEvent } from "./modules/TrackEvent";
declare global {
	interface Window { tracker: ITracker; }
}

let prevEvents: ITrackPrevEvent[] = [];
if (window['tracker']?.prevEvents) {
	prevEvents = window['tracker'].prevEvents;
	delete window['tracker'].prevEvents;
}
const tracker = new Tracker(prevEvents);
window["tracker"] = tracker;