const express = require("express");
let cors = require("cors");

const connection = require("./connection");

const userRoute = require("./routes/user");
const studentRoute = require("./routes/student");
const studentScoreRoute = require("./routes/score");


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoute);
app.use('/student', studentRoute);
app.use('/score', studentScoreRoute);

module.exports = app;