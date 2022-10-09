import pino from "pino";
import { Validator, AllowedSchema } from "express-json-validator-middleware";

export class EnvValidator {
	private logger = pino();

	constructor(schema: AllowedSchema, config: Record<string, string>) {
		const validator = new Validator({});


		const validateFunc = validator.ajv.compile(schema);
		const result = validateFunc(config);
		if (!result) {
			this.logger.error(validateFunc.errors);
			process.exit(1);
		}
	}
}