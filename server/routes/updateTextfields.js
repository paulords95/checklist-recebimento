const router = require("express").Router();
require("dotenv").config();

const { db } = require("../db");

const authorization = require("../middleware/authorization");

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

router.get("/obsrec/:USU_CODREC", authorization, async (req, res) => {
  try {
    const { USU_CODREC } = req.params;
    const sql = "select USU_OBSREC from usu_t158 WHERE USU_CODREC=:1";

    db(sql, "select", USU_CODREC)
      .then((response) => {
        if (response[0].USU_OBSREC != null) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    res.json(false);
    console.log(error.message);
  }
});

router.post("/acacor/", authorization, async (req, res) => {
  try {
    const { USU_ACACOR, USU_CODREC } = req.body;
    console.log(req.body);
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

router.get("/acacor/:USU_CODREC", authorization, async (req, res) => {
  try {
    const { USU_CODREC } = req.params;
    const sql = "select USU_ACACOR from usu_t158 WHERE USU_CODREC=:1";

    db(sql, "select", USU_CODREC)
      .then((response) => {
        console.log(response);
        if (response[0].USU_ACACOR != null) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    res.json(false);
    console.log(error.message);
  }
});

module.exports = router;
