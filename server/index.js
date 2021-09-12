const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const { PORT } = require("./credentials");

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());
app.use(express.json());

//routes
app.use("/auth", require("./routes/soap-auth"));

app.use("/item", require("./routes/searchChecklist"));

app.use("/post", require("./routes/postChecklist"));

app.use("/product", require("./routes/updateProduct"));

app.use("/simple-auth", require("./routes/userLogin"));

app.use("/filled-item", require("./routes/checkFilledItem"));

app.use("/obs", require("./routes/updateTextfields"));

app.use("/img", require("./routes/savePicture"));

app.use('/print', require('./routes/printRel'))

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
