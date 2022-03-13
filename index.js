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

// -------deployment------

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build/index.html"));
//   });
// }
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

// -------deployment------

const {
  notFound,
  errorHandler,
} = require("./models/middlewares/errorMiddleware.js");
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node JS Server Started on PORT ${port}`));
