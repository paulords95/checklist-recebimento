const soap = require("soap");
require("dotenv").config();

soap.createClient(process.env.SOAP_ENDPOINT, function (err, client) {
  client.GetUser(
    {
      user: "user",
      password: "pass",
      encryption: "0",
      parameters: "",
    },
    function (err, result) {
      if (err) return console.log(err);
      console.log(result);
    }
  );
});
