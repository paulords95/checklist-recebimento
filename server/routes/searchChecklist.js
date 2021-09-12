const router = require("express").Router();
require("dotenv").config();

const { db } = require("../db");

const authorization = require("../middleware/authorization");
const currentDate
  = require('../utils/currentDate')


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

    db(sql, "select", req.params.seqChk)
      .then((response) => {
        res.json(response);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

router.get("/search/alltoday", authorization, async (req, res) => {
  try {
    const sql = `SELECT * FROM USU_T158 WHERE USU_DATREC = TO_DATE('${currentDate()}','DD/MM/YYYY') ORDER BY 1 DESC`;
    const sqlSpoof = `SELECT * FROM USU_T158 WHERE USU_DATREC = TO_DATE('10/09/2021','DD/MM/YYYY') ORDER BY 1 DESC`;


    db(sqlSpoof, "select")
      .then((response) => {
        res.json(response);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
