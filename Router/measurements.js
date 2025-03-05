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


router.get('/measurements', [measurements_Mid.ReadMeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.measurements_data });
    } else {
        return res.status(500).json({ message: req.err });
    }
});


router.put('/measurements', [measurements_Mid.UpdateMeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.err });
    }
});


router.delete('/measurements', [measurements_Mid.DeleteMeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.err });
    }
});


router.post('/measurements/daterange', [measurements_Mid.GetUserMeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.measurements_data });
    } else {
        return res.status(500).json({ message: req.err });
    }
});


router.post('/measurements/monthly-averages', [measurements_Mid.GetMonthlyUserAverages], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.AvgMeasuresByMonth });
    } else {
        return res.status(500).json({ message: req.err });
    }
});


router.post('/measurements/all-users-stats', [measurements_Mid.GetAllUsersStatistics], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.users_statistics });
    } else {
        return res.status(500).json({ message: req.err });
    }
});


module.exports = router;
