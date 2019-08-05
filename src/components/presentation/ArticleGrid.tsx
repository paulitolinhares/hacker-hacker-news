import React from "react";
import styled from "styled-components";
import ArticleComponent from "./Article";
import { ArticleState } from "../../state/types";

interface ArticleGridProps {
  articles: ArticleState[];
}

const GridComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 200px);
  grid-template-rows: repeat(5, 200px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <GridComponent>
      {articles.map(articleState => (
        <ArticleComponent
          key={articleState.id}
          article={articleState.article}
          loading={articleState.loading}
          expanded={articleState.expanded}
        />
      ))}
    </GridComponent>
  );
}
