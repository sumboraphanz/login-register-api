const jwt = require("jsonwebtoken");
const users = require('../schemas/users')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    jwt.verify(authHeader, process.env.JWT_KEY, (err, user) => {

        if (err) return res.status(400).json("Invalid authorization or token has been expired please login again")
        req.user = user
        next();
    })

    // const result = await users.find({ username: req.user.user.username });
    // if (result.length == 1) {
    //     next();
    // } else {
    //     return res.status(400).json('User does not exist');
    // }
}