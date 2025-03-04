const express = require('express');
const router = express.Router();

const measurements_Mid = require("../middleware/measurements_Mid");

router.post('/measurements', [measurements_Mid.Addmeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", Last_Id: req.insertId });
    } else {
        return res.status(500).json({ message: req.err });
    }
});
