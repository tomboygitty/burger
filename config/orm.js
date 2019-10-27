// Import MySQL connection
var connection = require("../config/connection.js")

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // Loop through the keys and push the key/value as a string int array
    for (var key in ob) {
        var value = ob[key];
        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
        // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
        }
    }
  
    // Translate array of strings to a single comma-separated string
    return arr.toString();
  }

// Create an object to store ORM functions
var orm = {
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (?);";
        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

// Export the ORM functions to be used elsewhere
module.exports = orm;