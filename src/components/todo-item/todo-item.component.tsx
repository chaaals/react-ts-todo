import React from "react";
import styled from "styled-components";

import { Todo } from "../../App";

type Props = Todo;

const ItemContainer = styled.div<{ pinned: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  background-color: #fff;
  border: 1px solid black;

  padding: 0.75rem;
`;

const Item = styled.p`
  margin: 0;
`;

const Button = styled.button`
  background-color: orangered;
  border: none;
  color: white;

  padding: 0.5em 0.75em;
  border-radius: 8px;
  cursor: pointer;
`;

const TodoItem: React.FC<Props> = ({
  todo_key,
  todo_name,
  pinned,
  onClick,
}) => {
  return (
    <ItemContainer id="todo-item" data-todo-key={todo_key} pinned={pinned}>
      <Item key={todo_key}>{todo_name}</Item>
      <Button onClick={onClick}>Remove</Button>
    </ItemContainer>
  );
};

export default TodoItem;
