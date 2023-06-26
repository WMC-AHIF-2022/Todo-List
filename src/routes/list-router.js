const express = require('express');
const mySQL = require('mysql');
const jwt = require('jsonwebtoken');
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

const secretKey = "Qbt9rE+7qUq9GstXZPc7d7gLdJIbNdxaI1ONsvmg5Ls=";

listsRouter.use(express.json());

listsRouter.get("/getLists", (req, res) => {
    const decoded = jwt.verify(req.query.token, secretKey);

    db.query(`SELECT * FROM LISTS WHERE ACCID = '${decoded.id}'`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

listsRouter.post("/createList", (req, res) => {
    const decoded = jwt.verify(req.body.token, secretKey);

    db.query(`SELECT * FROM LISTS WHERE NAME = '${req.body.value}' AND ACCID = '${decoded.id}'`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        // if no list with this name exists yet
        if (rows.length === 0) {
            db.query(`SELECT ID FROM ACCOUNT`, (err, rows) => {
                db.query(`INSERT INTO LISTS (NAME, ACCID) VALUES ('${req.body.value}', '${decoded.id}')`, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.status(200).json(rows);
                })
            });
        } else {
            res.status(500).json("Name does already exist");
        }
    })
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