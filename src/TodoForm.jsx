import {useState} from "react";

function TodoForm({onAddTask}) {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!task.trim()) return;

        onAddTask(task.trim());
        setTask("");
    };

    return (
        <form onSubmit = {handleSubmit} className="todo-form">
            <input
            type="text"
            placeholder="Add new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            />

            <button type="submit">Add Task</button>
        </form>
    )
}

export default TodoForm;