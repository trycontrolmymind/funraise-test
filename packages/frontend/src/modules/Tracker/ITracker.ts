export interface ITracker {
	track(event: string, ...tags: string[]): void
}