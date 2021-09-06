const router = require("express").Router();
require("dotenv").config();

const fs = require("fs");
const { db } = require("../db");

const saveToPath = require("../utils/saveToPath");

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

router.post("/save/:seq", authorization, async (req, res) => {
  try {
    const imgdata = req.body.res;
    const seq = req.params.seq;

    console.log(seq);

    let base64Image = imgdata.split(";base64,").pop();

    fs.writeFile(
      `${seq}.png`,
      base64Image,
      { encoding: "base64" },
      function (err) {
        console.log("File created");
      }
    );

    saveToPath(seq)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    return res.json("Salvo");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
