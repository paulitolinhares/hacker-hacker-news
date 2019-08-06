import React from "react";
import styled from "styled-components";
import ArticleComponent from "./Article";
import { ArticleState, ActionTypes } from "../../state/types";

interface ArticleGridProps {
  articles: ArticleState[];
  toggleExpanded?: ({
    id,
    index
  }: {
    id?: number;
    index?: number;
  }) => ActionTypes;
  cursorIndex: number;
}

const GridComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 200px);
  grid-template-rows: repeat(auto-fit, 200px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

export default function ArticleGrid({
  articles,
  cursorIndex,
  toggleExpanded
}: ArticleGridProps) {
  return (
    <GridComponent>
      {articles.map((articleState, index) => (
        <ArticleComponent
          key={articleState.id}
          article={articleState.article}
          loading={articleState.loading}
          expanded={articleState.expanded}
          selected={index === cursorIndex}
          onClick={() =>
            toggleExpanded && toggleExpanded({ id: articleState.id })
          }
        />
      ))}
    </GridComponent>
  );
}
