const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express();

// serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require ("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
const routes = require("./controllers/burgers_controllers.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
});