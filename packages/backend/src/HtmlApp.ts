import express from "express";
import pino from "pino";
import path from "path";
import helmet from "helmet";
import { Validator, AllowedSchema } from "express-json-validator-middleware";


export class HtmlApp {
	private app: express.Express;
	private readonly logger = pino();
	private readonly envSchema: AllowedSchema = {
		type: "object",
		required: ["HTML_DIST_PATH", "PUBLIC_PORT"],
		properties: {
			HTML_DIST_PATH: {
				type: "string",
				minLength: 1,
			},
			PUBLIC_PORT: {
				pattern: "\\d{4}",
				type: "string",
			},

		},
	};

	constructor(private readonly config: Record<string, string>) {
		this.validateEnv()
	}

	public init(port: number) {
		this.app = express();

		this.app.use(helmet({
			contentSecurityPolicy: false,
		}));

		// path to HTML builded files
		const pathToHtml = path.join(process.cwd(), this.config["HTML_DIST_PATH"]);
		this.app.use(express.static(pathToHtml));

		this.app.listen(port, () => {
			this.logger.info(`Listening port ${port}...`)
		})
	}

	private validateEnv() {
		const validator = new Validator({});


		const validateFunc = validator.ajv.compile(this.envSchema);
		const result = validateFunc(this.config);
		if (!result) {
			this.logger.error(validateFunc.errors);
			process.exit(1);
		}
	}
}