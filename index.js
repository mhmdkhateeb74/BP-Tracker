const port = 7291;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "view")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/history", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "history.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "stats.html"));
});


let db_M = require('./database');
global.db_pool = db_M.pool;


const Users_R = require('./Routers/user');
app.use('/U', Users_R);


const measurements_R = require('./Routers/measurements');
app.use('/M', measurements_R);

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
