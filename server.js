const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
// 	var now = new Date().toString();
// 	var log = `${now}: ${req.method} ${req.url}`;
// 	console.log(log);
// 	fs.appendFile('server.log', log + '\n', (err) => {
// 		if(err) {
// 			console.log("Unable to append to server.log");
// 		}
// 	});
// 	next();
// });

// app.use((req, res, next) => {
// 	app.get("login", (req,res) => {
// 		res.render("login.hbs");
// 	});
// 	next();
// })




app.get('/', (req, res) => {
	res.send("Hello World");
});

app.get("/login", (req, res) => {
	res.render("login.hbs");
});

app.get("/database", (req, res) => {
	res.render("database.hbs");
});

app.get("/users", (req, res) => {
	res.render("users.hbs");
});

app.get("/dashboard", (req, res) => {
	res.render("dashboard.hbs");
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

app.listen(3000, () => {
	console.log("Server is started");
});
