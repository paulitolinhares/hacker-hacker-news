import React, { useEffect } from "react";
import Main from "../presentation/Main";
import PaginationButton from "../presentation/PaginationButton";
import { connect } from "react-redux";
import { GridState, ArticleState, ActionTypes } from "../../state/types";
import {
  nextPage,
  prevPage,
  getTopStories,
  toggleExpanded
} from "../../state/actions";
import ArticleGrid from "../presentation/ArticleGrid";
import Footer from "../presentation/Footer";
import { getCurrentPageArticles } from "../../lib/pagination";

interface MainContainerProps {
  nextPage: () => ActionTypes;
  prevPage: () => ActionTypes;
  getTopStories: () => ActionTypes;
  toggleExpanded?: (id: number) => ActionTypes;
  articles: ArticleState[];
}

function MainContainer({
  nextPage,
  prevPage,
  getTopStories,
  toggleExpanded,
  articles
}: MainContainerProps) {
  useEffect(() => {
    getTopStories();
  }, [getTopStories]);
  return (
    <React.Fragment>
      <Main>
        <PaginationButton direction="left" onClick={prevPage} />
        <ArticleGrid articles={articles} toggleExpanded={toggleExpanded} />
        <PaginationButton direction="right" onClick={nextPage} />
      </Main>
      <Footer />
    </React.Fragment>
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
  getTopStories,
  toggleExpanded
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
