import { Article } from "../models/article";

export interface ArticleState {
  id: number;
  loading: boolean;
  expanded: boolean;
  article: Article | undefined;
}

export interface GridState {
  isModalOpen: boolean;
  articles: ArticleState[];
  page: number;
  cursorIndex: number;
}

export const GET_TOP_STORIES = "GET_TOP_STORIES";
export const GET_TOP_STORIES_SUCCESS = "GET_TOP_STORIES_SUCCESS";
export const LOAD_ARTICLE = "LOAD_ARTICLE";
export const LOAD_ARTICLE_SUCCESS = "LOAD_ARTICLE_SUCCESS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const TOGGLE_EXPANDED = "TOGGLE_EXPANDED";
export const NAVIGATION_NEXT_COLUMN = "NAVIGATION_NEXT_COLUMN";
export const NAVIGATION_PREV_COLUMN = "NAVIGATION_PREV_COLUMN";
export const NAVIGATION_NEXT_ROW = "NAVIGATION_NEXT_ROW";
export const NAVIGATION_PREV_ROW = "NAVIGATION_PREV_ROW";
export const TOGGLE_MODAL = "TOGGLE_MODAL";

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
    id?: number;
    index?: number;
  };
}

export interface NavigationNextRowAction {
  type: typeof NAVIGATION_NEXT_ROW;
}

export interface NavigationPrevRowAction {
  type: typeof NAVIGATION_PREV_ROW;
}

export interface NavigationNextColumnAction {
  type: typeof NAVIGATION_NEXT_COLUMN;
}

export interface NavigationPrevColumnAction {
  type: typeof NAVIGATION_PREV_COLUMN;
}

export interface ToggleModalAction {
  type: typeof TOGGLE_MODAL;
}

export type ActionTypes =
  | GetTopStoriesAction
  | GetTopStoriesSuccessAction
  | LoadArticleAction
  | LoadArticleSuccessAction
  | ChangePageAction
  | NextPageAction
  | PrevPageAction
  | ToggleExpandedAction
  | NavigationNextRowAction
  | NavigationPrevRowAction
  | NavigationNextColumnAction
  | NavigationPrevColumnAction
  | ToggleModalAction;
