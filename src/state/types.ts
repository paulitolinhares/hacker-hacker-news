import { Article } from "../models/article";

export interface ArticleState {
  id: number;
  loading: boolean;
  expanded: boolean;
  article: Article | undefined;
}

export interface GridState {
  articles: ArticleState[];
  page: number;
}

export const GET_TOP_STORIES = "GET_TOP_STORIES";
export const GET_TOP_STORIES_SUCCESS = "GET_TOP_STORIES_SUCCESS";
export const LOAD_ARTICLE = "LOAD_ARTICLE";
export const LOAD_ARTICLE_SUCCESS = "LOAD_ARTICLE_SUCCESS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const TOGGLE_EXPANDED = "TOGGLE_EXPANDED";

export interface GetTopStoriesAction {
  type: typeof GET_TOP_STORIES;
}

export interface GetTopStoriesSuccessAction {
  type: typeof GET_TOP_STORIES_SUCCESS;
  payload: {
    ids: number[];
  };
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

export interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  payload: {
    page: number;
  };
}

export interface NextPageAction {
  type: typeof NEXT_PAGE;
}

export interface PrevPageAction {
  type: typeof PREV_PAGE;
}

export interface ToggleExpandedAction {
  type: typeof TOGGLE_EXPANDED;
  payload: {
    id: number;
  };
}

export type ActionTypes =
  | GetTopStoriesAction
  | GetTopStoriesSuccessAction
  | LoadArticleAction
  | LoadArticleSuccessAction
  | ChangePageAction
  | NextPageAction
  | PrevPageAction
  | ToggleExpandedAction;
