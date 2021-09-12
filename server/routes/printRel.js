const router = require("express").Router();

const authorization = require("../middleware/authorization");


const printFile = require('../utils/printFile')


router.post("/rel", authorization, async (req, res) => {
  const { seqRec } = req.body

  try {
    console.log(seqRec)
    printFile(seqRec).then((response) => {
      console.log(response)
    }).catch((e) => {
      console.log(e)
    })
    res.json('printed')
  } catch (error) {
    console.log(error);
    res.json('failed to print')
  }
});

module.exports = router;