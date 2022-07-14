require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Require Routes
const coursesRouter = require("./routes/courses");
const classRouter = require("./routes/class");
const employeeRouter = require("./routes/employee");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api", coursesRouter);
app.use("/api", classRouter);
app.use("/api", employeeRouter);

// Port
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start server in port ${port}`));