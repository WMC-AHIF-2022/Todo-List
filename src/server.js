const express = require('express');
const app = express();

const todosRouter = require('./routes/todo-router.js').todosRouter;
const listsRouter = require('./routes/list-router.js').listsRouter;
const searchRouter = require('./routes/search-router.js').searchRouter;
const loginSignupRouter = require('./routes/login-signup-router').loginSignupRouter;

app.use("/api/todos", todosRouter);
app.use("/api/lists", listsRouter);
app.use("/api/search", searchRouter);
app.use("/api/loginSignup", loginSignupRouter);

app.get("/", (req, res) => {
    res.redirect('/login-signup.html');
})

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log("Server listening on port " + port);
})