import { AllowedSchema, } from "express-json-validator-middleware";

export const trackSchema: AllowedSchema = {
	type: "object",
	required: ["event", "tags", "url", "title", "ts"],
	properties: {
		event: {
			type: "string",
			minLength: 1,
		},
		tags: {
			type: "array",
			items: {
				type: "string"
			},
			maxItems: 50,
		},
		url: {
			type: "string",
			format: "uri"
		},
		title: {
			type: "string",
		},
		ts: {
			type: "string",
			format: "date-time"
		}
	}
}

export const trackArraySchema: AllowedSchema = {
	type: "array",
	items: trackSchema as any,
	maxItems: 10,
	minItems: 0,
}