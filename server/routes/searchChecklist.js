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

router.get("/search/chklst=:seqChk", authorization, async (req, res) => {
  try {
    const sql = "select * from usu_t158 where usu_codrec = :seq";

    const result = await db(sql, req.params.seqChk);
    const response = [];
    if (result.rows) {
      for (let i of result.rows) {
        response.push({
          codRec: i[0],
          datRec: formatDate(i[1]),
          codRev: i[2],
          tipVei: i[3],
          tipCar: i[4],
          posLac: i[5],
          nroLac: i[6],
          lpzVei: i[7],
          quesOne: i[8],
          quesTwo: i[9],
          quesThree: i[10],
          quesFour: i[11],
          quesFive: i[18],
          datEmi: formatDate(i[14]),
        });
      }
    }

    if (response.length > 0) {
      res.json(response[0]);
    } else {
      res.json("Código de recebimento não encontrado");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
