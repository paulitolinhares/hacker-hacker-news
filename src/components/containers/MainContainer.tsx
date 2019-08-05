import React, { useEffect } from "react";
import Main from "../presentation/Main";
import PaginationButton from "../presentation/PaginationButton";
import { connect } from "react-redux";
import { GridState, ArticleState, ActionTypes } from "../../state/types";
import { nextPage, prevPage, getTopStories } from "../../state/actions";
import ArticleGrid from "../presentation/ArticleGrid";
import { getCurrentPageArticles } from "../../lib/pagination";

interface MainContainerProps {
  nextPage: () => ActionTypes;
  prevPage: () => ActionTypes;
  getTopStories: () => ActionTypes;
  articles: ArticleState[];
}

function MainContainer({
  nextPage,
  prevPage,
  getTopStories,
  articles
}: MainContainerProps) {
  useEffect(() => {
    getTopStories();
  }, [getTopStories]);
  return (
    <Main>
      <PaginationButton direction="left" onClick={prevPage} />
      <ArticleGrid articles={articles} />
      <PaginationButton direction="right" onClick={nextPage} />
    </Main>
  );
}

function mapStateToProps(state: GridState) {
  return {
    articles: getCurrentPageArticles(state.articles, state.page)
  };
}

const mapDispatchToProps = {
  nextPage,
  prevPage,
  getTopStories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
