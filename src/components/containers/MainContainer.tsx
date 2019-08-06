import React, { useEffect } from "react";
import Main from "../presentation/Main";
import PaginationButton from "../presentation/PaginationButton";
import { connect } from "react-redux";
import { GridState, ArticleState, ActionTypes } from "../../state/types";
import {
  nextPage,
  prevPage,
  getTopStories,
  toggleExpanded,
  navNextRow,
  navPrevRow,
  navNextColumn,
  navPrevColumn
} from "../../state/actions";
import ArticleGrid from "../presentation/ArticleGrid";
import Footer from "../presentation/Footer";
import { getCurrentPageArticles } from "../../lib/pagination";
import useKeyboardNav from "../../hooks/useKeyboardNav";
import Page from "../presentation/Page";

interface MainContainerProps {
  nextPage: () => ActionTypes;
  prevPage: () => ActionTypes;
  getTopStories: () => ActionTypes;
  toggleExpanded: ({
    id,
    index
  }: {
    id?: number;
    index?: number;
  }) => ActionTypes;
  navNextRow: () => ActionTypes;
  navPrevRow: () => ActionTypes;
  navNextColumn: () => ActionTypes;
  navPrevColumn: () => ActionTypes;
  cursorIndex: number;
  page: number;
  articles: ArticleState[];
}

function MainContainer({
  nextPage,
  prevPage,
  getTopStories,
  toggleExpanded,
  navNextRow,
  navPrevRow,
  navNextColumn,
  navPrevColumn,
  cursorIndex,
  articles,
  page
}: MainContainerProps) {
  useEffect(() => {
    getTopStories();
  }, [getTopStories]);
  useKeyboardNav((key: string) => {
    switch (key) {
      case "top":
        navPrevRow();
        break;
      case "left":
        if (cursorIndex === 0) {
          prevPage();
        } else {
          navPrevColumn();
        }
        break;
      case "right":
        if (cursorIndex === 23) {
          nextPage();
        } else {
          navNextColumn();
        }
        break;
      case "down":
        navNextRow();
        break;
      case "toggle":
        toggleExpanded({
          index: page * 24 + cursorIndex
        });
        break;
      case "prevPage":
        prevPage();
        break;
      case "nextPage":
        nextPage();
        break;
    }
  });
  return (
    <React.Fragment>
      <Page>
        <div>Test header</div>
        <Main>
          <PaginationButton direction="left" onClick={prevPage} />
          <ArticleGrid
            articles={articles}
            toggleExpanded={toggleExpanded}
            cursorIndex={cursorIndex}
          />
          <PaginationButton direction="right" onClick={nextPage} />
        </Main>
        <Footer />
      </Page>
    </React.Fragment>
  );
}

function mapStateToProps(state: GridState) {
  return {
    articles: getCurrentPageArticles(state.articles, state.page),
    page: state.page,
    cursorIndex: state.cursorIndex
  };
}

const mapDispatchToProps = {
  nextPage,
  prevPage,
  getTopStories,
  toggleExpanded,
  navNextRow,
  navPrevRow,
  navNextColumn,
  navPrevColumn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
