const oracledb = require("oracledb");

const { USER, PASSWORD, CONNECTIONSTRING } = require("./credentials");

const SimpleOracleDB = require("simple-oracledb");

const user = USER;
const password = PASSWORD;
const connectString = CONNECTIONSTRING;

SimpleOracleDB.extend(oracledb);

const db = async (query, ...parameters) => {
  return new Promise((resolve, reject) => {
    oracledb.run(
      {
        user: user,
        password: password,
        connectString: connectString,
      },
      function onConnection(connection, callback) {
        connection.query(query, [...parameters], callback);
      },
      function onActionDone(error, result) {
        console.log(error);
        if (error != null) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.db = db;
