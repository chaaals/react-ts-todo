import React, { useReducer, useRef } from "react";
import styled from "styled-components";

import AddTodoForm from "./components/add-todo/add-todo-form.component";
import TodoItem from "./components/todo-item/todo-item.component";

export type Todo = {
  todo_key: string;
  todo_name: string | undefined;
  pinned: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type AddTodo = {
  readonly type: "add";
  readonly payload: Todo;
};

type DeleteTodo = {
  readonly type: "delete";
  readonly todo_key: string | null;
};

type PinTodo = {
  readonly type: "pin";
  readonly todo_key: string;
};

type Action = AddTodo | DeleteTodo | PinTodo;

type State = {
  todos: Array<Todo> | [];
};

const AppContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  gap: 1rem;

  width: 100vw;
  height: 100vh;
`;

const TodoApp = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;
  padding: 1rem;
  border-radius: 1em;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  min-width: 350px;
  background-color: #fff;
`;

const TaskContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  width: 300px;
  min-height: 75vh;
  max-height: 75vh;

  overflow: auto;
`;

function App() {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    todos: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = inputRef.current;
    if (!input || input?.value === undefined) return;

    if (!input.value) {
      console.error("Please write something on the text field.");
      return;
    }

    dispatch({
      type: "add",
      payload: {
        todo_key: generateRandomKey(),
        todo_name: input?.value,
        pinned: false,
      },
    });

    input.value = "";
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const el = event.target as Element;
    const todoItem = el.closest("#todo-item");

    if (!todoItem) return;

    dispatch({
      type: "delete",
      todo_key: todoItem.getAttribute("data-todo-key"),
    });
  };

  return (
    <AppContainer>
      <AddTodoForm inputRef={inputRef} onSubmit={handleSubmit} />
      <TodoApp>
        <h3>My Tasks</h3>
        <TaskContainer>
          {state.todos.length !== 0 ? (
            state.todos.map((todo) => (
              <TodoItem
                key={todo.todo_key}
                todo_key={todo.todo_key}
                todo_name={todo.todo_name}
                pinned={todo.pinned}
                onClick={handleDelete}
              />
            ))
          ) : (
            <p>
              <strong>Way to go! You have no tasks left.</strong>
            </p>
          )}
        </TaskContainer>
      </TodoApp>
    </AppContainer>
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
