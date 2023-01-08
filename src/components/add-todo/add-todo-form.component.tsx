import React from "react";
import styled from "styled-components";

import AddButton from "../button/add-button.component";

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = styled.form``;
const Input = styled.input``;

const AddTodoForm: React.FC<Props> = ({ inputRef, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        name="input"
        type="text"
        placeholder="Today I am going to do..."
        ref={inputRef}
      />
      <AddButton type="submit">Add</AddButton>
    </Form>
  );
};

export default AddTodoForm;
