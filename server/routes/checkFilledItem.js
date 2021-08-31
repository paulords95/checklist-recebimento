const router = require("express").Router();

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

router.get("/form/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;

    const sql =
      "select USU_lpzvei, USU_d5, USU_d6, USU_d7, USU_d8 from usu_t158 where usu_codrec = :seq";

    const response = await db(sql, seq);
    let parsedResponse = [];
    if (response.rows) {
      if (response.rows.length > 0) {
        for (let i of response.rows) {
          parsedResponse.push(i);
        }
      }
    }
    res.json(parsedResponse[0]);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/prod/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;

    const sql = "";
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
