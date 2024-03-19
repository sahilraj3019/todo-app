import React, { useState, useEffect } from "react";
import "./App.css";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleRemoveTodo = (index: any) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    if (editIndex === index) {
      setEditIndex(-1);
    }
  };

  const handleToggleTodo = (index: any) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEditTodo = (index: any) => {
    setEditIndex(index);
    setInputValue(todos[index].text);
  };

  const handleSaveEdit = () => {
    if (inputValue.trim() !== "") {
      const newTodos = [...todos];
      newTodos[editIndex].text = inputValue;
      setTodos(newTodos);
      setInputValue("");
      setEditIndex(-1);
    }
  };

  return (
    <div className="todo-container">
      <h1>To - Do List </h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        {editIndex === -1 ? (
          <button onClick={handleAddTodo}> Add </button>
        ) : (
          <button onClick={handleSaveEdit}> Save </button>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo: any, index: any) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(index)}
            />
            <span className={todo.completed ? "completed" : ""}>
              {editIndex === index ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              ) : (
                todo.text
              )}
            </span>
            {editIndex === index ? (
              <button style={{backgroundColor: "lightgreen"}} onClick={() => handleSaveEdit()}> Save </button>
            ) : (
              <button style={{backgroundColor: "purple"}} onClick={() => handleEditTodo(index)}> Edit </button>
            )}
            <button onClick={() => handleRemoveTodo(index)}> Remove </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
