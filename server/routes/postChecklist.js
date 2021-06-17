const router = require("express").Router();
require("dotenv").config();

const { db } = require("../db");

const authorization = require("../middleware/authorization");

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

router.post("/vehicle-information/", authorization, async (req, res) => {
  try {
    console.log(req.body);
    const { recNum, cleaning, sealInput, seal, trailer, vehicle } = req.body;

    const sql =
      "UPDATE USU_T158 SET USU_TIPVEI=:vehicle, USU_TIPCAR=:trailer, USU_POSLAC=:seal, USU_NROLAC=:sealInput, USU_LPZVEI=:cleaning WHERE USU_CODREC = :recNum";

    const updateRow = await db(
      sql,
      vehicle,
      trailer,
      seal,
      sealInput,
      cleaning,
      recNum
    );
    if (updateRow.rowsAffected > 0) {
      res.json(true);
    } else {
      res.json(req.body);
    }
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
