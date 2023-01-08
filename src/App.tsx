import React, { useReducer, useRef } from "react";

import AddTodoForm from "./components/add-todo/add-todo-form.component";

type Todo = {
  todo_key: string;
  todo_name: string | undefined;
  pinned: boolean;
};

type AddTodo = {
  readonly type: "add";
  readonly payload: Todo;
};

type DeleteTodo = {
  readonly type: "delete";
  readonly todo_key: string;
};

type PinTodo = {
  readonly type: "pin";
  readonly todo_key: string;
};

type Action = AddTodo | DeleteTodo | PinTodo;

type State = {
  todos: Array<Todo> | [];
};

function App() {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    todos: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = inputRef.current;
    const payload = {
      todo_key: generateRandomKey(),
      todo_name: input?.value,
      pinned: false,
    };

    dispatch({ type: "add", payload });
  };

  return (
    <div className="App">
      <AddTodoForm inputRef={inputRef} onSubmit={handleSubmit} />
      <h3>My Tasks</h3>
      <div>
        {state.todos &&
          state.todos.map((todo) => (
            <p key={todo.todo_key} data-todo-key={todo.todo_key}>
              {todo.todo_name}
            </p>
          ))}
      </div>
    </div>
  );
}

export default App;

// == helper fns ==

function generateRandomKey(): string {
  return `!ts-todo-${Math.random() * 9999}`;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return { todos: [...state.todos, action.payload] };

    case "delete":
      return {
        todos: state.todos.filter(
          ({ todo_key }) => todo_key !== action.todo_key
        ),
      };

    case "pin":
      return {
        todos: state.todos.map((todo) => {
          if (todo.todo_key === action.todo_key) {
            return {
              ...todo,
              pinned: !todo.pinned,
            };
          }

          return todo;
        }),
      };
  }
  return state;
}
