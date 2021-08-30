const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const {PORT_DEV} = require('./credentials')

app.use(cors());
app.use(express.json());

//routes
app.use("/auth", require("./routes/soap-auth"));

app.use("/item", require("./routes/searchChecklist"));

app.use("/post", require("./routes/postChecklist"));

app.use("/product", require("./routes/updateProduct"));

app.use('/simple-auth', require('./routes/userLogin'))

app.listen(PORT_DEV, () => {
  console.log(`server running at port ${PORT_DEV}`);
});
