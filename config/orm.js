const connection = require("./connection.js");

// Helper function for SQL syntax
// Loops through and creates an array of question marks and turns it into a string
function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    const arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
      const value = ob[key];
    // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
    // if string has spaces, add quotations
    if (typeof value === "string" && value.indexOf(" ") >= 0) {
      value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }

    return arr.toString();
}

let orm = {
    selectAll: function(tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

        insertOne: function(table, cols, vals, cb) {
            let queryString = "INSERT INTO " + table;
        
            queryString += " (";
            queryString += cols.toString();
            queryString += ") ";
            queryString += "VALUES (";
            queryString += printQuestionMarks(vals.length);
            queryString += ") ";
        
            console.log(queryString);
        
            connection.query(queryString, vals, function(err, result) {
              if (err) {
                throw err;
              }
        
              cb(result);
            });
          },
    
    updateOne: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },

      deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
    };




module.exports = orm;