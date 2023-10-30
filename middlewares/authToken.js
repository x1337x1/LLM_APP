const jwt = require('jsonwebtoken');
require("dotenv").config();

const isAuthorized = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        // check if the token is valid
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return res.unAuthorizedRequest()
            req.user = user
            next()
        })
    } catch (error) {
        res.failureResponse(error)

    }

}
module.exports = isAuthorized