import React from "react";
import styled from "styled-components";

interface HeaderProps {
  onHelpClick?: () => void;
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #1c2321;
  color: #fff;
  padding: 0 16px;
`;

const HelpButton = styled.button`
  background: none;
  border: 1px solid #fff;
  border-radius: 50%;
  color: #fff;
  padding: 0;
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export default function HeaderComponent({ onHelpClick }: HeaderProps) {
  return (
    <Header>
      <h1>Hacker-hacker news</h1>
      <HelpButton onClick={onHelpClick}>?</HelpButton>
    </Header>
  );
}
