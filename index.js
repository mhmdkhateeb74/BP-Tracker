const port = 7291;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));

let db_M = require('./database');
global.db_pool = db_M.pool;



app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
