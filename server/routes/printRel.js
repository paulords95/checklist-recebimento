const router = require("express").Router();
const ptp = require("pdf-to-printer");

const authorization = require("../middleware/authorization");


const printFile = require('../utils/printFile')

router.get('/getprinters', authorization, async (req, res) => {
  try {
    ptp
      .getPrinters()
      .then((data) => {
        let response = []
        for (let i of data) {
          if (i.deviceId !== 'Microsoft Print to PDF' && i.deviceId !== 'Microsoft XPS Document Writer' && i.deviceId !== 'Microsoft Print to PDF (redirected 2)' && i.deviceId !== 'Microsoft XPS Document Writer (redirected 2)' && i.deviceId !== 'Fax (redirected 2)') {

            response.push(i)
          }
        }
        res.json(response)
      })
      .catch((e) => {
        res.json(e)
      });
  } catch (error) {
    res.json(error)
  }
})


router.post("/rel", authorization, async (req, res) => {
  const { seqRec, printer } = req.body
  try {



    printFile(seqRec, 'Microsoft Print To PDF').then((response) => {
      res.json(response)
    }).catch((e) => {
      res.json(e)
    })

  } catch (error) {
    res.json('failed to print')
  }
});

module.exports = router;