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
  navPrevColumn,
  toggleModal
} from "../../state/actions";
import ArticleGrid from "../presentation/ArticleGrid";
import Footer from "../presentation/Footer";
import { getCurrentPageArticles } from "../../lib/pagination";
import useKeyboardNav from "../../hooks/useKeyboardNav";
import Page from "../presentation/Page";
import Modal from "../presentation/Modal";
import Header from "../presentation/Header";

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
  toggleModal: () => ActionTypes;
  cursorIndex: number;
  page: number;
  articles: ArticleState[];
  isModalOpen: boolean;
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
  page,
  isModalOpen,
  toggleModal
}: MainContainerProps) {
  useEffect(() => {
    getTopStories();
  }, [getTopStories]);
  useKeyboardNav((key: string) => {
    console.log({ key });
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
      case "toggleModal":
        toggleModal();
        break;
    }
  });
  return (
    <React.Fragment>
      <Page>
        <Header onHelpClick={toggleModal} />
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
      <Modal open={isModalOpen} onClose={toggleModal} />
    </React.Fragment>
  );
}

function mapStateToProps(state: GridState) {
  return {
    articles: getCurrentPageArticles(state.articles, state.page),
    page: state.page,
    cursorIndex: state.cursorIndex,
    isModalOpen: state.isModalOpen
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
  navPrevColumn,
  toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
