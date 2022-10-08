import { ITrackEventInfo, ITrackEvent } from "./ITrackEvent";

/**
 * Full information about collected event
 */
export class TrackEvent implements ITrackEvent {
	private readonly _info: ITrackEventInfo;

	public get info(): ITrackEventInfo {
		return { ...this._info };
	}

	constructor(event: string, tags: string[]) {
		this._info = {
			event,
			tags,
			url: document.URL,
			title: document.title,
			ts: new Date().toISOString(),
		}
	}
}