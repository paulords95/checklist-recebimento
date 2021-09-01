const oracledb = require("oracledb");
require("dotenv").config();

const { USER, PASSWORD, CONNECTIONSTRING } = require("./credentials");

const user = USER;
const password = PASSWORD;
const connectString = CONNECTIONSTRING;

const db = async (query, ...parameters) => {
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    result = await connection.execute(query, [...parameters], {
      autoCommit: true,
    });
    return result;
  } catch (err) {
    return err.message;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

exports.db = db;
