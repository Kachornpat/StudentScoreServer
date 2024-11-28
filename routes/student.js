const express = require("express");
const connection = require("../connection");
const auth = require("../services/authentication");
const user_role = require("../services/role");

const router = express.Router();

router.post('/addStudent', auth.authenticationToken, user_role.roleValidation, (req, res, next) => {
    let new_student = req.body;
    let query = "INSERT INTO student (first_name, last_name, nick_name) VALUES (?, ?, ?)"
    connection.query(query,
        [
            new_student.first_name,
            new_student.last_name,
            new_student.nick_name
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(
                {
                    message: "Add the new student successfully",
                    result: result
                }
            );
        });
});

router.get('/getStudents', auth.authenticationToken, (req, res, next) => {
    let order_by = req.body.order_by || "first_name";
    let query = "SELECT * FROM student ORDER BY ?"
    connection.query(query, [order_by],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        }
    );
});

router.patch('/updateStudent', auth.authenticationToken, user_role.roleValidation, (req, res, next) => {
    let update_student = req.body;
    let query = "UPDATE student SET first_name=?, last_name=?, nick_name=? WHERE id=?"
    connection.query(query,
        [
            update_student.first_name,
            update_student.last_name,
            update_student.nick_name,
            update_student.id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.affectedRows == 0) {
                return res.status(404).json({message: "Student id not found"});
            }
            return res.status(200).json({
                message: "Update student successfully!",
                result: result
            });
        });
});


router.delete('/delete/:studentId', auth.authenticationToken, (req, res) => {
    let student_id = req.params.studentId;
    let query = "DELETE FROM student WHERE id=?";
    connection.query(query, [student_id], (err, result) => {
        if (err)
        {
            return res.status(500).json(err);
        }
        if (result.affectedRows == 0){
            return res.status(404).json({message: "Student id not found"})
        }
        return res.status(200).json({
            message: "student deleted sucessfully!",
            result: result
        })
    })
});

module.exports = router;