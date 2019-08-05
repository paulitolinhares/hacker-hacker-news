import React from "react";
import styled, { css } from "styled-components";

type DirectionType = "left" | "right";

interface PaginationButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  direction: DirectionType;
}

const leftPositioning = css`
  left: 10px;
`;

const rightPositioning = css`
  right: 10px;
`;

const PaginationButton = styled.button`
  border: none;
  background: none;
  font-size: 48px;
  cursor: pointer;
  transition: all 0.2s;
  position: absolute;
  top: 350px;

  ${(props: { direction: DirectionType }) =>
    props.direction === "right" ? rightPositioning : leftPositioning}

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
    <PaginationButton onClick={onClick} direction={direction}>
      <i className={`icon-angle-${direction}`} />
    </PaginationButton>
  );
}
