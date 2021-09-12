const base64 = require("base64topdf");
const ptp = require("pdf-to-printer");
const fs = require("fs");
var soap = require("strong-soap").soap;

const { SOAP_ENDPOINT_PRINT, ERP_USER, ERP_PASS } = require("../credentials");

const user = "paulo.silva";
const password = "1995!Oluap";

const printFile = (codRec) => {
  return new Promise((resolve, reject) => {
    const arrArgs = {
      prEntrada: `<ECodRec=${codRec}>`,
      prRelatorio: "QQRG100.GER",
      prEntranceIsXML: "F",
      prExecFmt: "tefFile",
      prSaveFormat: "tsfPDF",
      prTypeBmp: "N",
      prUniqueFile: "N",
    };

    var requestArgs = {
      user: ERP_USER,
      password: ERP_PASS,
      encryption: "0",
      parameters: arrArgs,
    };

    var options = {};
    soap.createClient(SOAP_ENDPOINT_PRINT, options, function (err, client) {
      const method = client["Executar"];
      method(requestArgs, function (err, result, envelope, soapHeader) {
        let decodedBase64 = base64.base64Decode(
          result.result.prRetorno,
          `${codRec}.pdf`
        );

        const options = {
          printer: "Microsoft Print to PDF",
          //printer: "\\\\qcolps01.quimtia.net.br\\COLOR",
        };

        ptp
          .print(`./${codRec}.pdf`, options)
          .then((result) => {
            console.log(result);
            try {
              fs.unlinkSync(`./${codRec}.pdf`);
              resolve("print success");
            } catch (err) {
              console.error(err);
              reject("print error");
            }
          })
          .catch(console.error);
      });
    });
  });
};

module.exports = printFile;
