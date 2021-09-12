const router = require("express").Router();

const authorization = require("../middleware/authorization");


const printFile = require('../utils/printFile')


router.post("/rel", authorization, async (req, res) => {
  const { seqRec } = req.body
  try {
    printFile(seqRec).then((response) => {
      res.json(response)
    }).catch((e) => {
      res.json(e)
    })

  } catch (error) {
    res.json('failed to print')
  }
});

module.exports = router;