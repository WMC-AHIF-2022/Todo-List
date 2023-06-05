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

const listsRouter = express.Router();
module.exports = { "listsRouter": listsRouter };

listsRouter.get("/getLists", (req, res) => {
    console.log(req.query)
    db.query(`SELECT * FROM LISTS WHERE ACCID = '${req.query.accID}'`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})


listsRouter.post("/createList", (req, res) => {
    db.query(`SELECT ID FROM ACCOUNT`, (err, rows) => { // ermittlung der account id
        // erstellen der liste mit dem werten "name" und "account id"
        db.query(`INSERT INTO LISTS (NAME, ACCID) VALUES ('${req.body.value}', '${req.body.accID}')`, (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(rows);
        })
    });
})

listsRouter.put("/editList", (req, res) => {
    if (req.body.value.length > 40) {
        res.status(400).json({ message: "input too long"});
        return;
    }
    db.query(`UPDATE LISTS SET NAME = '${req.body.value}' WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

listsRouter.delete("/deleteList", (req, res) => {
    db.query(`DELETE FROM LISTS WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})