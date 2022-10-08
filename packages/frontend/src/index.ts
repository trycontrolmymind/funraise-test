import { ITracker, Tracker } from "./modules/Tracker";
declare global {
	interface Window { tracker: ITracker; }
}

const tracker = new Tracker();
window["tracker"] = window["tracker"] || tracker;