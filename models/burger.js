// Import ORM functions
var orm = require("../config/orm.js")

// Create burger object
var burger = {
    selectAll: function() {
        orm.selectAll();
    },
    insertOne: function() {
        orm.insertOne();
    },
    updateOne: function() {
        orm.updateOne();
    }
};

// Export burger object for the controller to use
module.exports = burger;