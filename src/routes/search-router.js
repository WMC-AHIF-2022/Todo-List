const express = require('express');
const mySQL = require('mysql');
const jwt = require("jsonwebtoken");
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

const secretKey = "Qbt9rE+7qUq9GstXZPc7d7gLdJIbNdxaI1ONsvmg5Ls=";

searchRouter.use(express.json());

searchRouter.get("/getTodosWithOccurringLetters", (req, res) => {
    const decoded = jwt.verify(req.query.token, secretKey);

    db.query(`SELECT * FROM TODOS WHERE LOWER(NAME) LIKE '%${req.query.letter}%' AND ACCID = ${decoded.id};`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.status(200).json(rows);
    });
})

searchRouter.get("/getListsWithOccurringLetters", (req, res) => {
    const decoded = jwt.verify(req.query.token, secretKey);

    db.query(`SELECT * FROM LISTS WHERE LOWER(NAME) LIKE '%${req.query.letter}%' AND ACCID = ${decoded.id};`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    });
})

searchRouter.get("/getListIDFromSearchedTodo", (req, res) => {
    db.query(`SELECT LISTID FROM TODOS WHERE ID = ${req.query.id}`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        res.status(200).json(row);
    });
});

searchRouter.get("/getSearchedListName", (req, res) => {
    db.query(`SELECT NAME FROM LISTS WHERE ID = ${req.query.id}`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        res.status(200).json(row);
    });
})