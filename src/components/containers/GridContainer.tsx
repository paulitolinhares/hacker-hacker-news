import React, { useEffect } from "react";
import ArticleGrid from "../presentation/ArticleGrid";
import { connect } from "react-redux";
import { GridState, ArticleState } from "../../state/types";
import { getTopStories } from "../../state/actions";

interface GridContainerProps {
  getTopStories: any;
  articles: ArticleState[];
}

const GridContainer = ({ getTopStories, articles }: GridContainerProps) => {
  useEffect(() => {
    getTopStories();
  }, []);
  return <ArticleGrid articles={articles} />;
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
