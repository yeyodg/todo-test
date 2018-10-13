const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

let todos = [];

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/api/todos', (req, res) => {
    res.send({
        message: 'GET ',
        todos: todos
    });
});

app.post('/api/todos', (req, res) => {
    console.log(req.body);
    todos.push({
        check: req.body.check || false,
        todo: req.body.todo
    });
    res.status(201).send({
        message: 'POST',
        body: req.body,
        todos: todos
    });
});

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    if (id > todos.length - 1) {
        res.status(500).send({
            message: 'The id:' + id + ' does not exits.',
        });
    }
    console.log('Deleting id: ', req.params.id);
    todos.splice(id, 1);
    res.send({
        message: 'DELETE ' + id,
        todos: todos
    });
});

app.patch('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    if (id > todos.length - 1) {
        res.status(500).send({
            message: 'The id:' + id + ' does not exits.',
        });
    }
    todos[id] = {
        ...todos[id],
        ...req.body
    }
    res.send({
        message: 'PATCH ' + id,
        todos: todos
    });
});

app.get('/api/todos/check/:id', (req, res) => {
    const id = req.params.id;
    if (id > todos.length - 1) {
        res.status(500).send({
            message: 'The id:' + id + ' does not exits.',
        });
    }
    todos[id].check = !todos[id].check;
    res.send({
        message: 'CHECK ' + id,
        todos: todos
    });
});



app.listen(port, () => console.log(`Listening on port ${port}`));