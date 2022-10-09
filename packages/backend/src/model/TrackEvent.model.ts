import { Schema, model } from "mongoose";

const trackEventModel = new Schema({
	event: String,
	tags: [String],
	url: String,
	title: String,
	ts: Date,
});

export const TrackEvent = model('TrackEvent', trackEventModel);