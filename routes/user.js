require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const connection = require("../connection");
let auth = require('../services/authentication');

const router = express.Router();

router.post('/signup', (req, res) => {
    let user = req.body;
    let query = "SELECT username, email, password, status FROM user WHERE email=?";
    connection.query(query, [user.email], (err, data) => {
        if (!err) {
            if (data.length <= 0) {
                query = "INSERT INTO user(username, email, password, status) values(?,?,?,?)";
                connection.query(query, [user.username, user.email, user.password, user.status], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "Register Successfully!!" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json(
                    {
                        message: "This email is already registerd, please try another email."
                    }
                )
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
})

router.post('/login', (req, res) => {
    const user = req.body;
    let query = "SELECT username, email, password, status FROM user WHERE email=?";
    connection.query(query, [user.email], (err, data) => {
        if (!err) {
            if (data.length <= 0 || data[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect email/password" })
            }
            else if (data[0].status === 'inactive') {
                return res.status(401).json({ message: "This user is inactive" });
            }
            else if (data[0].password == user.password) {
                const response = {
                    email: data[0].email,
                    username: data[0].username
                }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ token: accessToken })
            }
            else {
                return res.status(400).json({ message: "Something went wrong, please try again." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
})

module.exports = router;