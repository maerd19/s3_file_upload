const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./routes/upload.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/upload", uploadRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
