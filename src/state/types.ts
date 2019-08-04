import { Article } from "../models/article";

export interface ArticleState {
  id: number;
  loading: boolean;
  expanded: boolean;
  article: Article | undefined;
}

export interface GridState {
  articles: ArticleState[];
}

export const GET_TOP_STORIES = "GET_TOP_STORIES";
export const LOAD_ARTICLE = "LOAD_ARTICLE";
export const LOAD_ARTICLE_SUCCESS = "LOAD_ARTICLE_SUCCESS";

export interface GetTopStoriesAction {
  type: typeof GET_TOP_STORIES;
}

export interface LoadArticleAction {
  type: typeof LOAD_ARTICLE;
  payload: {
    id: number;
  };
}

export interface LoadArticleSuccessAction {
  type: typeof LOAD_ARTICLE_SUCCESS;
  payload: {
    id: number;
    data: any;
  };
}

export type ActionTypes =
  | GetTopStoriesAction
  | LoadArticleAction
  | LoadArticleSuccessAction;
