import React from "react";
import styled from "styled-components";

interface PaginationButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  direction: "left" | "right";
}

const PaginationButton = styled.button`
  border: none;
  background: none;
  font-size: 48px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.25);
  }

  &:focus {
    outline: none;
  }
`;

export default function PaginationButtonComponent({
  onClick,
  direction
}: PaginationButtonProps) {
  return (
    <PaginationButton onClick={onClick}>
      <i className={`icon-angle-${direction}`} />
    </PaginationButton>
  );
}
