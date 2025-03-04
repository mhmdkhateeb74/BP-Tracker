async function Addmeasurements(req, res, next) {
    let user_id   = req.body.user_id;
    let systolic  = req.body.systolic;
    let diastolic = req.body.diastolic;
    let pulse     = req.body.pulse;
    let date      = req.body.date;



    if (
        user_id === undefined ||
        systolic === undefined ||
        diastolic === undefined ||
        pulse === undefined ||
        date === undefined
    ) {
        req.success = false;
        req.err = "One or more required fields are undefined";
        return next();
    }

    const Query = `INSERT INTO measurements (user_id, systolic, diastolic, pulse, date) VALUES ('${user_id}', '${systolic}', '${diastolic}', '${pulse}', '${date}')`;
    const promisePool = db_pool.promise();
    let rows = [];
    try {
        [rows] = await promisePool.query(Query);
        req.success = true;
        req.insertId = rows.insertId;
    } catch (err) {
        console.log("Error in Addmeasurements:", err);
        req.success = false;
        req.err = err;
        req.insertId = -1;
    }
    next();
}



module.exports = {
    Addmeasurements,
    
};
