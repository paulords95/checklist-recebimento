const router = require("express").Router();

const { LocalConvenienceStoreOutlined } = require("@material-ui/icons");
const { db } = require("../db");

const authorization = require("../middleware/authorization");

router.get("/form/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;
    const sql =
      "select USU_TIPVEI, USU_TIPCAR, USU_POSLAC, USU_LPZVEI from usu_t158 where usu_codrec = :seq";

    db(sql, "select", seq)
      .then((response) => {
        const data = response[0];
        if (
          data.USU_TIPVEI > 0 ||
          data.USU_TIPCAR > 0 ||
          data.USU_POSLAC > 0 ||
          data.USU_LPZVEI > 0
        ) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/form-2/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;

    const sql =
      "select USU_D5, USU_D6, USU_D7, USU_D8, USU_D9 from usu_t158 where usu_codrec = :seq";

    db(sql, "select", seq)
      .then((response) => {
        const data = response[0];

        if (
          data.USU_D5 > 0 ||
          data.USU_D6 > 0 ||
          data.USU_D7 > 0 ||
          data.USU_D8 > 0 ||
          data.USU_D9 > 0
        ) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/prod/:seq/", authorization, async (req, res) => {
  try {
    const { seq } = req.params;

    const sql =
      "select usu_b1,  usu_b3, usu_b4, usu_idepro,  usu_acaime from usu_t159 where usu_codrec = :seq";

    db(sql, "select", seq)
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
