const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

//routes
app.use("/auth", require("./routes/soap-auth"));

app.use("/item", require("./routes/searchChecklist"));

app.use("/post", require("./routes/postChecklist"));

app.use("/product", require("./routes/updateProduct"));

app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
