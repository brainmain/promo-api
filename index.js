require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers/index");
const errorHandlingMiddleware = require("./middlewares/errorHandling.middleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173", // insert ip address of the frontend
    ],
  })
);
app.use("/", router);
app.use(errorHandlingMiddleware);

function start() {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

start();
