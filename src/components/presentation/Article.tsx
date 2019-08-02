import React, { Fragment } from "react";
import styled from "styled-components";
import { Article as ArticleIF } from "../../types/article";

interface ArticleProps {
  article?: ArticleIF;
  loading: boolean;
}

const Article = styled.article`
  box-sizing: border-box;
  border: 5px solid transparent;
  display: flex;
  padding: 16px;
  background-color: #eef1ef;

  /* TODO add border color for cursor: #a9b4c2 */
`;

const Score = styled.span`
  color: #1c2321;
  font-size: 12px;
  text-align: center;

  &:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #1c2321;
    margin: 0 auto 3px;
  }
`;

const ContentContainer = styled.div`
  margin-left: 16px;
`;

const Title = styled.h3`
  color: #1c2321;
  font-weight: 700;
  font-size: 16px;
  margin-top: 0;
`;

const Author = styled.p`
  color: #1c2321;
  font-size: 12px;
`;

const Text = styled.p`
  color: #1c2321;
  font-size: 14px;
`;

const StyledSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #1c2321;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #1c2321 transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => (
  <SpinnerContainer>
    <StyledSpinner>
      <div />
      <div />
      <div />
      <div />
    </StyledSpinner>
  </SpinnerContainer>
);

export default function ArticleComponent({ article, loading }: ArticleProps) {
  return (
    <Article>
      {!loading && article && (
        <Fragment>
          <Score>{article.score}</Score>
          <ContentContainer>
            <Title>{article.title}</Title>
            <Author>By {article.author}</Author>
            <Text>{article.text}</Text>
          </ContentContainer>
        </Fragment>
      )}
      {loading && <Spinner />}
    </Article>
  );
}
