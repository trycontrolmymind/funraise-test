import { AllowedSchema } from "express-json-validator-middleware";

export const scriptAppSchema: AllowedSchema = {
	type: "object",
	required: ["SCRIPT_PORT", "SCRIPT_DIST_PATH"],
	properties: {
		SCRIPT_DIST_PATH: {
			type: "string",
			minLength: 1,
		},
		SCRIPT_PORT: {
			pattern: "\\d{4}",
			type: "string",
		},

	},
};

export const htmlAppSchema: AllowedSchema = {
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