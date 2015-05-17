/// <reference path="../typings/tsd.d.ts" />

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var adsModel = require("./../models/ads");
var app = express();
mongoose.connect("mongodb://localhost/onlineAds");

app.use(express.static("public"));
app.use("/views", express.static("src/views"));
app.use(bodyParser.json());

app.get("/api/ads", function (request, response) {
	console.log("getting ads");
	mongoose.model("ads").find(function (error, ads) {
		response.send(ads);
	});
});

app.post("/api/ads/", function (request, response) {
	var Ads = mongoose.model("ads");
	var ad = request.body;
	ad.impressions = Math.round(Math.random() * 10000);
	ad.spend = Math.round((Math.random() * 100000)) / 100;
	new Ads(ad).save(function (error, ad) {
		if(error){
			console.log(error);
			return response.sendStatus(500);
		}
		return response.send(ad);
	});
});

app.delete("/api/ads/:id", function (request, response) {
	console.log("deleting ad with id", request.params.id);
	mongoose.model("ads").find({ _id: request.params.id }).remove(function (error) {
		if (error) {
			response.send(error);
		} else {
			response.sendStatus(200);
		}
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s%s", host, port);
});