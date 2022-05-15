require('dotenv').config();
const express = require('express');
const app = express();
const adminRouter = require("./api/user/user.router");

app.use(express.json());
app.use("/api/user", adminRouter);


app.listen(process.env.APP_PORT, () => {
    console.log("server up and running");
})