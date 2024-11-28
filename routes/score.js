const express = require("express");
const connection = require("../connection");

const auth = require("../services/authentication");
const user_role = require("../services/role");

const router = express.Router();


router.get('/getScores', auth.authenticationToken, (req, res, next) => {
    let query = "SELECT student.first_name, score.score FROM student LEFT JOIN studentScore as score ON student.id = score.student_id"
    connection.query(query,
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        }
    );
});

router.get('/getScoreById/:studentId', auth.authenticationToken, (req,res, next)=>{
    const student_id = req.params.studentId;
    let query = "SELECT student.first_name, score.score FROM student LEFT JOIN studentScore as score ON student.id = score.student_id WHERE student.id=?";
    connection.query(query, [student_id],
        (err, result) => {
            if (err)
            {
                return res.status(500).json(err);
            }
            return res.status(200).json(result);
        }
    )
});

// router.delete('/delete/:studentId');

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

module.exports = router;