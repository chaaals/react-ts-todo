import React from "react";
import styled from "styled-components";

type Props = {
  type: "button" | "submit";
  children?: React.ReactNode;
};

const Button = styled.button``;

const AddButton: React.FC<Props> = ({ children, type }) => (
  <Button type={type}>{children}</Button>
);

export default AddButton;
