const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const filesRoutes = require("./routes/files.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/files", filesRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
