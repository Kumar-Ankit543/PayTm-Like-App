const express = require("express");
const router = require("./routes/routes");

const app = express();

app.use("/api/v1/", router);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
