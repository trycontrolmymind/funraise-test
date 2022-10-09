import express from "express";
import pino from "pino";
import path from "path";
import helmet from "helmet";

import { EnvValidator } from "./EnvValidator";
import { scriptAppSchema } from "./schemas/envSchemas";


export class ScriptApp {
	private app: express.Express;
	private readonly logger = pino();
	private readonly envSchema = scriptAppSchema;

	constructor(private readonly config: Record<string, string>) {
		new EnvValidator(this.envSchema, this.config);
	}

	public init() {
		this.app = express();

		this.app.use(helmet({
			contentSecurityPolicy: false,
			crossOriginEmbedderPolicy: false,
			crossOriginResourcePolicy: false,
		}));

		// path to HTML builded files
		const pathToScript = path.join(process.cwd(), this.config["SCRIPT_DIST_PATH"]);
		this.app.use("/", (req, res) => {
			res.sendFile(pathToScript);
		});

		this.app.post("/track");

		this.app.use((err: unknown, req: express.Request, res: express.Response, next: any) => {
			this.logger.error(err);
			res.status(500);
		})

		const port = parseInt(this.config["SCRIPT_PORT"], 10);
		this.app.listen(port, () => {
			this.logger.info(`Listening port ${port}...`)
		})
	}
}