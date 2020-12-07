const express = require("express");
const router = express.Router();

// import the model(burger.js) to use it's db functions
const burger = require("../models/burger.js");

// create 'router' for the app

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        let hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne("burger_name", [req.body.burger_name], function(result) {
        // reloads the page and prompts the get route
        console.log(burger);
        res.redirect("/");
        res.json({ id: result.insertID });

    });
});

router.put("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    },
    condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;
  
    burger.deleteOne(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});

module.exports = router