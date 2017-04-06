const express = require("express");
const bodyParser = require('body-parser');
const hbs = require("hbs");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient

hbs.registerPartials(__dirname + '/views/partial');


var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var db;

MongoClient.connect("mongodb://localhost:27017/application-manager", function(err, database) {
  if(err) throw err;
  db = database;
  app.listen(3000);
  console.log("Listening on port 3000");
});



app.get('/', (req, res) => {
	res.send("Hello World");
});

app.get("/login", (req, res) => {
	res.render("login.hbs");
});

app.post("/checkdata", (req, res) => {
	db.collection('jobs').count({}, function(err, docs){
	    if(err){
	        console.log(err);
	        res.render("dashboard.hbs");
	    }
	    else{
	    	console.log(docs)
	    	var result = {
	    		count_list: docs
	    	}
	        res.render("dashboard.hbs", result);
	    }
	});
});

app.post("/savejob", (req, res) => {
	db.collection('jobs').insertOne(
		req.body, (err,result) => {
		if(err) {
			return console.log("Unable to connect jobs", err);
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
	});
	res.render("dashboard.hbs");
});

app.get("/lists", (req, res) => {
	db.collection('jobs').find().toArray().then((docs) => {
    	console.log(JSON.stringify(docs, undefined, 2));
    	var result = {
    		job_list : docs
    	}
    	res.render("lists.hbs", result)
  	});
});

app.get("/dashboard", function(req, res) {
	db.collection('jobs').count({}, function(err, docs){
	    if(err){
	        console.log(err);
	        res.render("dashboard.hbs");
	    }
	    else{
	    	console.log(docs)
	    	var result = {
	    		count_list: docs
	    	}
	        res.render("dashboard.hbs", result);
	    }
	});
});


app.get("/addjob", (req, res) => {
	res.render("addjob.hbs");
});

app.get("/help", (req, res) => {
	res.render("help.hbs",{
		pageTitle: "Home Page",
		currentYear: new Date().getFullYear()
	});
});

app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "Unable to handle request"
	})
})

