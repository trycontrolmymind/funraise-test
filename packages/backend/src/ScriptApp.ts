import express from "express";
import pino from "pino";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { ValidationError, Validator } from "express-json-validator-middleware";
import addAjvFormats from "ajv-formats";

import { EnvValidator } from "./EnvValidator";
import { scriptAppSchema } from "./schemas/envSchemas";
import { trackArraySchema, trackSchema } from "./schemas/trackSchema";


/**
 * Serving script route and POST /track
 */
export class ScriptApp {
	private app: express.Express;
	private readonly logger = pino();
	private readonly envSchema = scriptAppSchema;

	constructor(private readonly config: Record<string, string>) {
		new EnvValidator(this.envSchema, this.config);
	}

	public init() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());

		this.app.use(helmet({
			contentSecurityPolicy: false,
			crossOriginEmbedderPolicy: false,
			crossOriginResourcePolicy: false,
		}));

		this.createTrackRoutes();
		this.createScriptRoute();
		this.createErrorHandler();

		const port = parseInt(this.config["SCRIPT_PORT"], 10);
		this.app.listen(port, () => {
			this.logger.info(`Listening port ${port}...`)
		})
	}

	private createTrackRoutes() {
		const { validate, ajv } = new Validator({});
		addAjvFormats(ajv);

		this.app.post("/track", validate({ body: trackArraySchema }), (_, response) => {
			response.status(200).send();
		});
	}

	private createScriptRoute() {
		const pathToScript = path.join(process.cwd(), this.config["SCRIPT_DIST_PATH"]);
		this.app.use("/", (_, res) => {
			res.sendFile(pathToScript);
		});
	}

	private createErrorHandler() {
		this.app.use((err: unknown, req: express.Request, res: express.Response, next: any) => {
			if (err instanceof ValidationError) {
				this.logger.error(err.validationErrors);
				res.status(400).json({ ...err.validationErrors });
			} else {
				this.logger.error(err);
				res.status(500).json({})
			}
			next();
		})
	}
}