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

app.get("/api/ads/:id", function (request, response) {
	mongoose.model("ads").findById(request.params.id, function (error, ad) {
		if(error){
			response.status(404);
			return response.send(error);
		} else if(ad === null){
			return response.sendStatus(404);
		}
		response.status(200);
		response.send(ad);
	});
});

app.put("/api/ads/:id", function (request, response) {
	var adToUpdate = request.body;
	mongoose.model("ads").findById(request.params.id, function (error, ad) {
		if(error){
			return response.send(error);
		} else if(ad === null) {
			return response.sendStatus(404);
		}
		ad.name = adToUpdate.name;
		ad.campaignName = adToUpdate.campaignName;
		ad.picture = adToUpdate.picture;
		ad.description = adToUpdate.description;
		ad.isActive = adToUpdate.isActive;
		ad.save(function (error) {
			if(error){
				return response.send(error);
			}
			response.status(200);
			response.send(ad);
		});
	});
});

app.post("/api/ads/", function (request, response) {
	var Ads = mongoose.model("ads");
	var ad = request.body;
	ad.impressions = Math.round(Math.random() * 10000);
	ad.spend = Math.round((Math.random() * 100000)) / 100;
	ad.created = new Date();
	new Ads(ad).save(function (error, ad) {
		if(error){
			console.log(error);
			return response.send(error);
		}
		response.status(201);
		return response.send(ad);
	});
});

app.delete("/api/ads/:id", function (request, response) {
	console.log("deleting ad with id", request.params.id);
	mongoose.model("ads").find({ _id: request.params.id }).remove(function (error) {
		if (error) {
			response.send(error);
		} else {
			response.sendStatus(204);
		}
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s%s", host, port);
});