import { Logger } from "../Logger";
import { ITrackEvent } from "../TrackEvent";
import { ITrackerTransport } from "./ITrackerTransport";

export class TrackerTransport implements ITrackerTransport {
	private readonly timeout = 1000 as const;
	private readonly url = "http://localhost:8001/track" as const;
	private readonly logger = new Logger();

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
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors"
			})
				.then(this.responseHandler)
				.then((resp) => {
					if (resp.success) {
						resolve();
					} else {
						this.logger.log(resp.error);
						reject();
					}
				})
				.catch(() => reject())
		})
	}

	private async responseHandler(r: Response) {
		if (r.status === 200) {
			return { success: true }
		} else {
			const error = await r.json()
			return { success: false, error };
		}
	}
}