import styled from "styled-components";
import React from "react";

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: #1c2321;
  color: #fff;
`;

const Link = styled.a`
  color: #fff;
  transition: color 0.4s ease-in-out;

  &:visited,
  &:active {
    color: #fff;
  }

  &:hover {
    color: #a1a1a1;
  }
`;

export default function FooterComponent() {
  return (
    <Footer>
      <p>
        made by{" "}
        <Link href="https://github.com/paulitolinhares" target="_blank">
          paulitolinhares
        </Link>
      </p>
    </Footer>
  );
}
