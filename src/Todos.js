import { useEffect, useReducer, useState } from "react";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), completed: false, text: action.payload },
        ],
      };
    case "Toggle":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "Edit":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case "Remove":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "Loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "Loading":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const Todos = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currId, setCurrId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "Loading", payload: true });
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        dispatch({ type: "Loading", payload: false });
        dispatch({ type: "Add", payload: data[0].title });
      } catch (err) {
        dispatch({ type: "Loading", payload: false });
        dispatch({ type: "Error", payload: "Err fetching data" });
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = () => {
    if (isEditing) {
      dispatch({ type: "Edit", payload: { id: currId, text: input } });
      setIsEditing(false);
      setCurrId(null);
    } else {
      dispatch({ type: "Add", payload: input });
    }
    setInput("");
  };

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrId(todo.id);
    setInput(todo.text);
  };

  return (
    <div>
      <h3>Todo list app</h3>
      {state.loading && <p>Loading ...</p>}
      {state.error && <p style={{ color: "red" }}>Error : {state.error}</p>}

      <ul>
        {state.todos.map((todo) => (
          <li>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: "Toggle", payload: todo.id })}
            >
              Completed
            </button>
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button
              onClick={() => dispatch({ type: "Remove", payload: todo.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            handleSubmit();
          }
        }}
      />
      <button onClick={handleSubmit}>{isEditing ? "Update" : "Add"}</button>
    </div>
  );
};

export default Todos;
