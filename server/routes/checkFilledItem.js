const router = require("express").Router();

const { db } = require("../db");

const authorization = require("../middleware/authorization");

router.get("/form/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;

    const sql =
      "select USU_TIPVEI, USU_TIPCAR, USU_POSLAC, USU_LPZVEI from usu_t158 where usu_codrec = :seq";

    const response = await db(sql, seq);
    let parsedResponse = [];
    if (response.rows) {
      if (response.rows.length > 0) {
        for (let i of response.rows) {
          parsedResponse.push(i);
        }
      }
    }
    res.json(
      parsedResponse.length > 0
        ? parsedResponse[0].every((val, i, arr) => val > 0)
        : null
    );
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/form-2/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;

    const sql =
      "select USU_D5, USU_D6, USU_D7, USU_D8, USU_D9 from usu_t158 where usu_codrec = :seq";

    const response = await db(sql, seq);
    let parsedResponse = [];
    if (response.rows) {
      if (response.rows.length > 0) {
        for (let i of response.rows) {
          parsedResponse.push(i);
        }
      }
    }
    res.json(
      parsedResponse.length > 0
        ? parsedResponse[0].every((val, i, arr) => val > 0)
        : null
    );
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/prod/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;

    const sql =
      "select usu_b1,  usu_b3, usu_b4, usu_idepro,  usu_acaime from usu_t159 where usu_codrec = :seq";

    const response = await db(sql, seq);
    let parsedResponse = [];
    if (response.rows) {
      if (response.rows.length > 0) {
        for (let i of response.rows) {
          for (let l of i) {
            parsedResponse.push(l);
          }
        }
      }
    }
    res.json(
      parsedResponse.length > 0
        ? parsedResponse.every((val, i, arr) => val > 0)
        : null
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
