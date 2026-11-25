import {useState, useEffect} from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new task
  const addTask = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  // Mark task as completed or active
  const toggleTask = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  // Edit a task
  const editTask = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText }
          : todo
      )
    );
  };

  // Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Count remaining tasks
  const remainingTasks = todos.filter(
    (todo) => !todo.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-container">
        <h1>My Todo List</h1>

        <TodoForm onAddTask={addTask} />

        <TodoFilter
          filter={filter}
          setFilter={setFilter}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        <div className="todo-footer">
          <span>
            {remainingTasks} {remainingTasks === 1 ? "task" : "tasks"} remaining
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
