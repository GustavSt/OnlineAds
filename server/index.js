/// <reference path="../typings/tsd.d.ts" />

var express = require("express");
var mockData = require("./../mockData.json");
var app = express();


app.use(express.static("public"));
app.use("/views", express.static("src/views"));
app.get("/api/ads", function (request, response) {
	console.log("getting ads");
	response.json(mockData);
	response.end();
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s%s", host, port);
});