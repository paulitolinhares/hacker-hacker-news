import React from "react";
import styled from "styled-components";
import { Article } from "../../types/article";
import ArticleComponent from "./Article";

interface ArticleGridProps {
  articles: Article[];
}

const GridComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 200px);
  grid-template-rows: repeat(5, 200px);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <GridComponent>
      {articles.map(article => (
        <ArticleComponent article={article} loading={false} expanded={false} />
      ))}
    </GridComponent>
  );
}
