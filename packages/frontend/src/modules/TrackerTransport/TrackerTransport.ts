import { ITrackEvent } from "../TrackEvent";
import { ITrackerTransport } from "./ITrackerTransport";

export class TrackerTransport implements ITrackerTransport {
	private readonly timeout = 1000 as const;
	private readonly url = "http://localhost:8001/track" as const;

	/**
	 * Send events to server with timeout
	 * @param {ITrackEvent[]} events Array of events in queue
	 */
	public async send(events: ITrackEvent[]) {
		return new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				reject();
			}, this.timeout)

			fetch(this.url, {
				body: JSON.stringify(events.map(e => e.info)),
				method: "POST"
			}).then((r) => {
				if (r.status !== 200) {
					resolve();
				} else {
					reject();
				}
			})
				.catch(() => reject())
		})
	}
}