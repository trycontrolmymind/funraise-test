export interface ITrackEvent {
	info: ITrackEventInfo;
}

export interface ITrackEventInfo {
	event: string;
	tags: string[];

	url: string;
	title: string;
	ts: string;
}

export type ITrackPrevEvent = Omit<ITrackEventInfo, 'url' | 'title'>