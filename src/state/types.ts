import { Article } from "../models/article";

export interface ArticleState {
  id: number;
  loading: boolean;
  expanded: boolean;
  article: Article;
}

export interface GridState {
  articles: ArticleState[];
}

export const GET_TOP_STORIES = "GET_TOP_STORIES";
export const LOAD_ARTICLE = "LOAD_ARTICLE";

interface GetTopStoriesAction {
  type: typeof GET_TOP_STORIES;
}

interface LoadArticleAction {
  type: typeof LOAD_ARTICLE;
  payload: {
    id: number;
  };
}

export type ActionTypes = GetTopStoriesAction | LoadArticleAction;
