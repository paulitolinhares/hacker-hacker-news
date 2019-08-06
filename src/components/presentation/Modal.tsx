import React from "react";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
}

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  display: none;
  ${(props: { open: boolean }) => props.open && `display: flex`}
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-width: 300px;
  min-height: 300px;
  padding: 16px;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export default function ModalComponent({ open, onClose }: ModalProps) {
  return (
    <ModalBackground open={open}>
      <ModalContent>
        <ModalClose onClick={onClose}>x</ModalClose>
        <h4>Help Center</h4>
        <p>Hacker-hacker News has some keyboard commands for heavy users</p>
        <ul>
          <li>
            W, S, A, D - move the grid cursor up, down, left and right,
            respectively{" "}
          </li>
          <li>Enter - open/close the selected story</li>
          <li>Right arrow - next page</li>
          <li>Left arrow - previous page</li>
          <li>H - open/close the help center</li>
        </ul>
      </ModalContent>
    </ModalBackground>
  );
}
