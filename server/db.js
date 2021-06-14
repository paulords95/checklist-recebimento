const oracledb = require("oracledb");
require("dotenv").config();

const user = process.env.USER;
const password = process.env.PASSWORD;
const connectString = process.env.CONNECTIONSTRING;

const db = async (query, ...parameters) => {
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });
    result = await connection.execute(query, [...parameters]);
    return result;
  } catch (err) {
    return err.message;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

exports.db = db;
