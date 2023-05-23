const express = require('express');
const app = express();
const mySQL = require('mysql');
const db = mySQL.createConnection({
    host: "45.81.235.37",
    user: "elplak",
    password: "050411",
    database: "todoList",
    port: 3306,
    secure: false
})

const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.listen(port, () => {
    console.log("Server listening on port " + port);
})

// ---------- TODOS ----------
app.get("/api/getTodos", (req, res) => {
    db.query(`SELECT ID, NAME, DONE, DATE_FORMAT(DEADLINE, '%d.%m.%Y') AS DEADLINESTRING, DESCRIPTION FROM TODOS WHERE LISTID = ${req.query.currentListID} ORDER BY DEADLINE`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

app.get("/api/getTodoByID", (req, res) => {
    db.query(`SELECT ID, NAME, DONE, DATE_FORMAT(DEADLINE, '%d.%m.%Y') AS DEADLINESTRING, DESCRIPTION FROM TODOS WHERE ID = ${req.query.currentID}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

app.post("/api/createTodo", (req, res) => {
    db.query(`INSERT INTO TODOS (name, done, listId, deadline) VALUES ('${req.body.value}', false, ${req.body.index}, STR_TO_DATE('${req.body.deadline}', '%d.%m.%Y'))`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

app.put("/api/editTodo", (req, res) => {
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

app.put("/api/editTodoDescription", (req, res) => {
    db.query(`UPDATE TODOS SET DESCRIPTION = '${req.body.value}' WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

app.delete("/api/deleteTodo", (req, res) => {
    db.query(`DELETE FROM TODOS WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

app.delete("/api/deleteAllTodosFromList", (req, res) => {
    db.query(`DELETE FROM TODOS WHERE LISTID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

// ---------- LISTS ----------
app.get("/api/getLists", (req, res) => {
    db.query("SELECT * FROM LISTS", (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})


app.post("/api/createList", (req, res) => {
    db.query(`INSERT INTO LISTS (name) VALUES ('${req.body.value}')`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})

app.put("/api/editList", (req, res) => {
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

app.delete("/api/deleteList", (req, res) => {
    db.query(`DELETE FROM LISTS WHERE ID = ${req.body.index}`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    })
})


// ---------- SEARCH ----------
app.get("/api/search/getTodosWithOccurringLetters", (req, res) => {
    db.query(`SELECT * FROM TODOS WHERE LOWER(NAME) LIKE '%${req.query.letter}%';`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    });
})

app.get("/api/search/getListsWithOccurringLetters", (req, res) => {
    db.query(`SELECT * FROM LISTS WHERE LOWER(NAME) LIKE '%${req.query.letter}%';`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(rows);
    });
})