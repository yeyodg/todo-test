import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", todos: [] };
  }
  componentDidMount() {
    this.getTodos();
  }

  handleTextareaChange(event) {
    this.setState({ value: event.target.value });
  }

  getTodos() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(
        res => {
          this.setState({ todos: res.todos });
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteTodo(i) {
    fetch("http://localhost:5000/api/todos/" + i, {
      method: "delete"
    })
      .then(res => res.json())
      .then(
        res => {
          let todos = this.state.todos;
          todos.splice(i, 1);
          this.setState({ todos: todos });
        },
        error => {
          console.log(error);
        }
      );
  }

  createTodo(event) {
    event.preventDefault();
    const body = { check: false, todo: this.state.value };
    fetch("http://localhost:5000/api/todos", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(
        res => {
          this.setState({ todos: [...this.state.todos, body] });
        },
        error => {
          console.log(error);
        }
      );
  }

  handleChechboxChange(i) {
    let todos = this.state.todos;
    todos[i].check = !todos[i].check;
    fetch("http://localhost:5000/api/todos/check/" + i)
      .then(res => res.json())
      .then(
        res => {
          this.setState({ todos: todos });
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    let todos = <li>Create your first task</li>;
    if (this.state.todos.length >= 1) {
      todos = this.state.todos.map((todo, i) => (
        <li key={i}>
          {todo.todo}
          <input
            type="checkbox"
            checked={todo.check}
            onChange={() => this.handleChechboxChange(i)}
          />
          <button onClick={() => this.deleteTodo(i)}>Delete</button>
        </li>
      ));
    }
    return (
      <div className="App">
        <form onSubmit={e => this.createTodo(e)}>
          <label>
            <h2>Create Todo</h2>
            <textarea
              type="text"
              onChange={e => this.handleTextareaChange(e)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <h2>Todos</h2>
        <ul>{todos}</ul>
      </div>
    );
  }
}
export default App;
