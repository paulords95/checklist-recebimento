const router = require("express").Router();
require("dotenv").config();

const fs = require("fs");
const { db } = require("../db");

const authorization = require("../middleware/authorization");

function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

const formatDate = (date) => {
  const d = date;
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formatBr = d
    .toLocaleDateString("pt-BR", options)
    .split("-")
    .reverse()
    .join("/");

  return formatBr;
};

router.post("/save/", authorization, async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
