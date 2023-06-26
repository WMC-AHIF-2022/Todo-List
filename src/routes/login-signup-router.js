const express = require('express');
// für hashing
const bcrypt = require('bcrypt');
const mySQL = require('mysql');
const {query} = require("express");
const {hash} = require("bcrypt");
const jwt = require('jsonwebtoken');
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

const secretKey = "Qbt9rE+7qUq9GstXZPc7d7gLdJIbNdxaI1ONsvmg5Ls=";

loginSignupRouter.use(express.json());

loginSignupRouter.post('/signup', async(req, res) => {
    const query = 'INSERT INTO ACCOUNT (USERNAME, PASSWORD) VALUES (?, ?)';

    // Passwort verschlüsseln
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    const values = [req.body.username, hashedPassword];
    const sql = mySQL.format(query, values);

    db.query(`SELECT * FROM ACCOUNT WHERE USERNAME = '${req.body.username}'`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        // Überprüfen, ob der Benutzername bereits existiert
        if (rows.length > 0) {
            res.status(500).json("Username already exists");
        } else {
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    const insertedId = result.insertId;

                    const payload = { userID: insertedId };
                    const token = jwt.sign(payload, secretKey);

                    res.status(200).json({ token: token });
                }
            });
        }
    });
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
            userID = rows[0].ID;

            // Überprüfen, ob die Passwörter übereinstimmen
            if (bcrypt.compareSync(req.query.password, hashedPassword)) {
                const currentID = rows[0].ID;
                const currentUsername = rows[0].USERNAME;

                const payload = { id: currentID };
                const token = jwt.sign(payload, secretKey);

                res.status(200).json({ token: token, currentUsername: currentUsername });
            }
        } else {
            res.status(400).json({ error: 'Invalid login information' });
        }
    });
});
