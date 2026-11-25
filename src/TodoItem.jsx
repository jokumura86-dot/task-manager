
import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editText.trim()) return;

    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => {
            setEditText(todo.text);
            setIsEditing(false);
          }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>

          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
