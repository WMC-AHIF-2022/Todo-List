const express = require('express');
const mySQL = require('mysql');
const db = mySQL.createConnection({
    host: "45.81.235.37",
    user: "elplak",
    password: "050411",
    database: "todoList",
    port: 3306,
    secure: false
})

const loginSignupRouter = express.Router();
module.exports = { "loginSignupRouter": loginSignupRouter };

loginSignupRouter.post('/signup', (req, res) => {
    const query = 'INSERT INTO ACCOUNT (USERNAME, PASSWORD) VALUES (?, ?)';
    const values = [req.body.username, req.body.password];
    const sql = mySQL.format(query, values);

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            const insertedId = result.insertId;
            res.status(200).json({ insertedId: insertedId });
        }
    });
});

loginSignupRouter.get("/login", (req, res) => {
    db.query(`SELECT ID, USERNAME FROM ACCOUNT WHERE USERNAME = '${req.query.username}' AND PASSWORD = '${req.query.password}'`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        if (rows.length > 0) {
            const currentID = rows[0].ID;
            const currentUsername = rows[0].USERNAME;
            res.status(200).json({currentID: currentID, currentUsername: currentUsername});
            return;
        }
        res.status(400);
    });
})