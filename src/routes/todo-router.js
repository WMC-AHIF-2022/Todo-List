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

const todosRouter = express.Router();
module.exports = { "todosRouter": todosRouter };

todosRouter.use(express.json());

todosRouter.get("/getTodos", (req, res) => {
    db.query(`SELECT ID, NAME, DONE, DATE_FORMAT(DEADLINE, '%d.%m.%Y') AS DEADLINESTRING, DESCRIPTION FROM TODOS WHERE LISTID = ${req.query.currentListID} ORDER BY DEADLINE`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

todosRouter.get("/getTodoByID", (req, res) => {
    db.query(`SELECT ID, NAME, DONE, DATE_FORMAT(DEADLINE, '%d.%m.%Y') AS DEADLINESTRING, DESCRIPTION FROM TODOS WHERE ID = ${req.query.currentID}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

todosRouter.post("/createTodo", (req, res) => {
    db.query(`INSERT INTO TODOS (name, done, listId, deadline, accID) VALUES ('${req.body.value}', false, ${req.body.index}, STR_TO_DATE('${req.body.deadline}', '%d.%m.%Y'), ${req.body.userID})`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

todosRouter.put("/editTodo", (req, res) => {
    if (req.body.value.length > 40) {
        res.status(400).json({ message: "input too long"});
        return;
    }
    db.query(`UPDATE TODOS SET NAME = '${req.body.value}' WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

todosRouter.put("/editTodoDate", (req, res) => {
    db.query(`UPDATE TODOS SET DEADLINE = STR_TO_DATE('${req.body.date}', '%d.%m.%Y') WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

todosRouter.put("/editTodoDescription", (req, res) => {
    db.query(`UPDATE TODOS SET DESCRIPTION = '${req.body.value}' WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

todosRouter.delete("/deleteTodo", (req, res) => {
    db.query(`DELETE FROM TODOS WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

todosRouter.delete("/deleteAllTodosFromList", (req, res) => {
    db.query(`DELETE FROM TODOS WHERE LISTID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})