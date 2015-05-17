/// <reference path="../typings/tsd.d.ts" />

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adsSchema = new Schema({
	name: String,
	campaignName: String,
	picture: String,
	isActive: Boolean,
	impressions: Number,
	spend: Number,
	description: String,
	created: Date
});

mongoose.model("ads", adsSchema);
