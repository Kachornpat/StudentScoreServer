const express = require("express");
const connection = require("../connection");

const auth = require("../services/authentication");
const user_role = require("../services/role");

const router = express.Router();


router.get('/getScores', (req, res, next) => {
    let query = "SELECT student.id, student.first_name, student.address, score.score, student.status FROM student LEFT JOIN studentScore as score ON student.id = score.student_id"
    connection.query(query,
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        }
    );
});

router.get('/getScoreById/:studentId', (req, res, next) => {
    const student_id = req.params.studentId;
    let query = "SELECT student.id, student.first_name, student.address, score.score, student.status FROM student LEFT JOIN studentScore as score ON student.id = score.student_id WHERE student.id=?";
    connection.query(query, [student_id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(result);
        }
    )
});

router.post('/addScore', auth.authenticationToken, (req, res, next) => {
    let new_student_score = req.body;
    let query = "INSERT INTO studentScore (student_id, score) VALUES (?, ?)"
    connection.query(query,
        [
            new_student_score.student_id,
            new_student_score.score
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({ message: "Add new student's score successfully", result: result });
        })
});

router.post('/addStudentScore', (req, res, next) => {
    let new_student_score = req.body;
    let new_student_id = 0;

    let query = "INSERT INTO student (first_name, last_name, nick_name, address) VALUES (?, ?, ?, ?)"
    connection.query(query,
        [
            new_student_score.first_name,
            new_student_score.last_name,
            new_student_score.nick_name,
            new_student_score.address,
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            new_student_id = result.insertId;
            query = "INSERT INTO studentScore (student_id, score) VALUES (?, ?)"
            connection.query(query,
                [
                    new_student_id,
                    new_student_score.score
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.status(200).json({ message: "Add new student's score successfully", result: result });
                })
        });



});

router.patch('/updateStudentScore', (req, res, next) => {
    let update_student_score = req.body;
    let query = "UPDATE studentScore SET score=? WHERE student_id=?"
    connection.query(query,
        [
            update_student_score.score,
            update_student_score.id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Student id not found" });
            }
            query = "UPDATE student SET first_name=?, last_name=?, address=?, status=? WHERE id=?"
            connection.query(query,
                [
                    update_student_score.first_name,
                    update_student_score.last_name,
                    update_student_score.address,
                    update_student_score.status,
                    update_student_score.id,
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    if (result.affectedRows == 0) {
                        return res.status(404).json({ message: "Student id not found" });
                    }
                    return res.status(200).json({
                        message: "Update student's score successfully!",
                        result: result
                    });
                });
        });

});

router.patch('/updateScore', auth.authenticationToken, (req, res, next) => {
    let update_student_score = req.body;
    let query = "UPDATE studentScore SET score=? WHERE student_id=?"
    connection.query(query,
        [
            update_student_score.score,
            update_student_score.student_id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Student id not found" });
            }
            return res.status(200).json({
                message: "Update student's score successfully!",
                result: result
            });
        });
});

router.delete('/delete/:studentId', auth.authenticationToken, (req, res) => {
    let student_id = req.params.studentId;
    let query = "DELETE FROM studentScore WHERE student_id=?";
    connection.query(query, [student_id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Student id not found" })
        }
        return res.status(200).json({
            message: "studentScore deleted sucessfully!",
            result: result
        })
    })
});

module.exports = router;