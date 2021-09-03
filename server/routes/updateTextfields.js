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

router.post("/obsrec/", authorization, async (req, res) => {
  try {
    const { USU_OBSREC, USU_CODREC } = req.body;
    const sql = "UPDATE USU_T158 SET USU_OBSREC=:1 WHERE USU_CODREC=:2";

    db(sql, "update", USU_OBSREC, USU_CODREC)
      .then((response) => {
        res.json(response);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/acacor/", authorization, async (req, res) => {
  try {
    const { USU_ACACOR, USU_CODREC } = req.body;
    const sql = "UPDATE USU_T158 SET USU_ACACOR=':1' WHERE USU_CODREC=:2";

    db(sql, "update", USU_ACACOR, USU_CODREC)
      .then((response) => {
        res.json(response);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
