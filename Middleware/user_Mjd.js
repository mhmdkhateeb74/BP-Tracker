
async function AddUser(req,res,next){
    let name   = req.body.name;

    const Query = `INSERT INTO users (name) VALUES('${name}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
        req.insertId=rows.insertId;
    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
}


async function ReadUsers(req, res, next) {
    const Query = `SELECT * FROM users`;

    const promisePool = db_pool.promise();
    let rows = [];
    try {
        [rows] = await promisePool.query(Query);

        req.success = true;
        req.users_data = rows;
    } catch (err) {
        req.success = false;
        req.err = err;
    }
    next();
}


async function UpdateUser(req,res,next){
    let idx    = parseInt(req.body.idx);
    let name   = req.body.name;

    let Query = `UPDATE users SET `;
    Query += ` name = '${name}' `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}


module.exports = {
    ReadUsers,
};
