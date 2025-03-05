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


async function ReadMeasurements(req, res, next) {
    let user_id = req.body.user_id;

    if (user_id === undefined) {
        req.success = false;
        req.err = "user_id is undefined";
        return next();
    }

    const Query = `SELECT * FROM measurements WHERE user_id = '${user_id}'`;
    const promisePool = db_pool.promise();
    let rows = [];
    try {
        [rows] = await promisePool.query(Query);
        if (rows.length > 0) {
            let sum = rows.reduce((acc, m) => acc + m.systolic, 0);
            let average = sum / rows.length;
            let threshold = average * 1.2;

            rows.forEach(m => {
                m.abnormal = (m.systolic > threshold);
            });
        }
        req.success = true;
        req.measurements_data = rows;
    } catch (err) {
        console.log("Error in ReadMeasurements:", err);
        req.success = false;
        req.err = err;
    }
    next();
}


async function UpdateMeasurements(req, res, next) {
    let id        = req.body.id;
    let user_id   = req.body.user_id;
    let systolic  = req.body.systolic;
    let diastolic = req.body.diastolic;
    let pulse     = req.body.pulse;
    let date      = req.body.date;

    if (
        id === undefined ||
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

    const Query = `UPDATE measurements SET 
                   user_id = '${user_id}', 
                   systolic = '${systolic}', 
                   diastolic = '${diastolic}', 
                   pulse = '${pulse}', 
                   date = '${date}' 
                   WHERE id = ${id}`;
    const promisePool = db_pool.promise();
    let rows = [];
    try {
        [rows] = await promisePool.query(Query);
        req.success = true;
    } catch (err) {
        console.log("Error in UpdateMeasurements:", err);
        req.success = false;
        req.err = err;
    }
    next();
}

async function DeleteMeasurements(req, res, next) {
    let id = req.body.id;

    if (id === undefined) { 
        req.success = false;
        req.err = "id is undefined";
        return next();
    }

    const Query = `DELETE FROM measurements WHERE id = ${id}`;
    const promisePool = db_pool.promise();
    let rows = [];
    try {
        [rows] = await promisePool.query(Query);
        req.success = true;
    } catch (err) {
        console.log("Error in DeleteMeasurements:", err);
        req.success = false;
        req.err = err;
    }
    next();
}


async function GetUserMeasurements(req, res, next) {
    let user_id    = req.body.user_id;
    let start_date = req.body.start_date;
    let end_date   = req.body.end_date;

    if (
        user_id === undefined ||
        start_date === undefined ||
        end_date === undefined
    ) {
        req.success = false;
        req.err = "One or more required fields are undefined";
        return next();
    }

    const Query = `SELECT * FROM measurements 
                   WHERE user_id = '${user_id}' AND date BETWEEN '${start_date}' AND '${end_date}'`;

    const promisePool = db_pool.promise();
    let rows = [];
    try {
        [rows] = await promisePool.query(Query);

        if (rows.length > 0) {
            let sum = rows.reduce((acc, m) => acc + m.systolic, 0);
            let average = sum / rows.length;
            let threshold = average * 1.2;

            rows.forEach(m => {
                m.abnormal = (m.systolic > threshold);
            });
        }

        req.success = true;
        req.measurements_data = rows;
    } catch (err) {
        console.log("Error in GetUserMeasurements:", err);
        req.success = false;
        req.err = err;
    }
    next();
}


module.exports = {
    Addmeasurements,
    ReadMeasurements,
    UpdateMeasurements,
    DeleteMeasurements,
    GetUserMeasurements,
    
};
