const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./router/userrouter");
const taskRouter = require("./router/taskrouter");
const morgan = require("morgan");

const cors = require("cors");
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//register router
app.use("/api", userRouter);
// task router
app.use("/task", taskRouter);

//home router
app.use("/", (req, res) => {
    res.send("backend running");
});
//server create
app.listen(5000, () => {
    console.log("server start on 5000");
});
//db connected
mongoose.connect(
    "mongodb+srv://prem:j27ctEZ4BqgSKNZP@cluster0.l8nwg.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("DB connected successfully");
        }
    }
);
