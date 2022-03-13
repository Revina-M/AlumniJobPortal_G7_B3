const express = require("express");
const app = express();
const db = require("./db.js");
const dotenv = require("dotenv");
const jobsRoute = require("./routes/jobsRoute");
const usersRoute = require("./routes/usersRoute");
const path = require("path");

dotenv.config();

app.use(express.json());
app.use("/api/jobs", jobsRoute);
app.use("/api/users", usersRoute);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const {
  notFound,
  errorHandler,
} = require("./models/middlewares/errorMiddleware.js");
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node JS Server Started on PORT ${port}`));
