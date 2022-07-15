const express = require("express");

const app = express();

app.use(express.json());


//    route are import here..
const user = require("./router/userRoute");


app.use("/api/v1", user);



module.exports = app;
