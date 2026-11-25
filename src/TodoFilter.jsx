function TodoFilter({filter, setFilter}) {
    const filters = ["all", "active", "completed"];

    return (
    <div className="todo-filters">
      {filters.map((item) => (
        <button
          key={item}
          className={filter === item ? "active-filter" : ""}
          onClick={() => setFilter(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
