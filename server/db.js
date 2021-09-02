const oracledb = require("oracledb");

const { USER, PASSWORD, CONNECTIONSTRING } = require("./credentials");

const SimpleOracleDB = require("simple-oracledb");

const user = USER;
const password = PASSWORD;
const connectString = CONNECTIONSTRING;

SimpleOracleDB.extend(oracledb);

const db = async (query, operation, ...parameters) => {
  return new Promise((resolve, reject) => {
    oracledb.run(
      {
        user: user,
        password: password,
        connectString: connectString,
      },

      function onConnection(connection, callback) {
        if (operation == "update") {
          try {
            connection.update(
              query,
              [...parameters],
              { autoCommit: true },
              callback
            );
          } catch (error) {
            console.log(error);
          }
        }
        if (operation == "select") {
          try {
            connection.query(query, [...parameters], callback);
          } catch (error) {
            console.log(error);
          }
        }
      },
      function onActionDone(error, result) {
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
