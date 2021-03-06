// Create Express dependency and Router
var express = require("express");
var router = express.Router();

// Import Burger model
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers/", function(req, res) {
    console.log(req.body.burger_name);
    burger.insertOne("burger_name", req.body.burger_name, function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    console.log("putting")
    var condition = "id = " + req.params.id;
    burger.updateOne({devoured: true}, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            // Else, the object with that ID was updated
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use
module.exports = router;