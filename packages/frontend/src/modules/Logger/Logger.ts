import { ILogger } from "./ILogger";

export class Logger implements ILogger {
	public log(...args: string[]) {
		console.error('[tracker]', ...args);
	}
}