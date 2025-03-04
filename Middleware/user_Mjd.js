
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


module.exports = {
    ReadUsers,
};
