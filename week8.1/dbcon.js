var mysql = require("mysql");
var pool = mysql.createPool({
	connectionLimit : 10,
	host            : "classmysql.oregonstate.edu",
	user            : "cs290_sulliste",
	password        : "9957",
	database        : "cs290_sulliste"
});

module.exports.pool = pool;