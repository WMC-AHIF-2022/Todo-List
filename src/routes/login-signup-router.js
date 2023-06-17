const express = require('express');
// für hashing
const bcrypt = require('bcrypt');
const mySQL = require('mysql');
const {query} = require("express");
const {hash} = require("bcrypt");
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

loginSignupRouter.use(express.json());

loginSignupRouter.post('/signup', async(req, res) => {
    const query = 'INSERT INTO ACCOUNT (USERNAME, PASSWORD) VALUES (?, ?)';

    // encrypt password
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    const values = [req.body.username, hashedPassword];
    const sql = mySQL.format(query, values);

    db.query(`SELECT * FROM ACCOUNT WHERE USERNAME = '${req.body.username}'`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        if (rows.length > 0) {
            res.status(500).json("Username does already exist");
        } else {
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    const insertedId = result.insertId;
                    res.status(200).json({ insertedId: insertedId });
                }
            });
        }
    })
});

loginSignupRouter.get("/login", async (req, res) => {
    db.query('SELECT ID, USERNAME, PASSWORD FROM ACCOUNT WHERE USERNAME = ?', [req.query.username], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(401);
            return;
        }

        if (rows.length > 0) {
            let hashedPassword = rows[0].PASSWORD;

            // check if passwords are the same
            if (bcrypt.compareSync(req.query.password, hashedPassword)) {
                const currentID = rows[0].ID;
                const currentUsername = rows[0].USERNAME;
                res.status(200).json({currentID, currentUsername});
            }
        } else { // if invalid send error to user --> client
            res.status(400).json({ error: 'Invalid login information' });
        }
    });
});