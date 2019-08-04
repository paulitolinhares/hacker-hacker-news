import React, { useEffect } from "react";
import ArticleGrid from "../presentation/ArticleGrid";
import { connect } from "react-redux";
import { GridState, ArticleState } from "../../state/types";
import { getTopStories } from "../../state/actions";
import { getCurrentPageArticles } from "../../lib/pagination";

interface GridContainerProps {
  getTopStories: any;
  articles: ArticleState[];
  page: number;
}

const GridContainer = ({
  getTopStories,
  articles,
  page
}: GridContainerProps) => {
  useEffect(() => {
    getTopStories();
  }, [getTopStories]);
  const paginatedArticles = getCurrentPageArticles(articles, page);

  return <ArticleGrid articles={paginatedArticles} />;
};

const mapStateToProps = (state: GridState) => {
  return state;
};

export default connect(
  mapStateToProps,
  {
    getTopStories
  }
)(GridContainer);
