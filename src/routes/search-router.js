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

const searchRouter = express.Router();
module.exports = { "searchRouter": searchRouter };

searchRouter.use(express.json());

searchRouter.get("/getTodosWithOccurringLetters", (req, res) => {
    db.query(`SELECT * FROM TODOS WHERE LOWER(NAME) LIKE '%${req.query.letter}%' AND ACCID = ${req.query.userID};`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(rows);
        res.status(200).json(rows);
    });
})

searchRouter.get("/getListsWithOccurringLetters", (req, res) => {
    db.query(`SELECT * FROM LISTS WHERE LOWER(NAME) LIKE '%${req.query.letter}%' AND ACCID = ${req.query.userID};`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    });
})
