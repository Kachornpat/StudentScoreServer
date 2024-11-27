require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, jwtResponse) => {
        if (err) {
            return res.sendStatus(403);
        }
        res.locals = jwtResponse;
        next();
    });
}

module.exports = {authenticationToken: authenticationToken};