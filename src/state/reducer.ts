import {
  ActionTypes,
  GridState,
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  GET_TOP_STORIES_SUCCESS,
  CHANGE_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  TOGGLE_EXPANDED,
  NAVIGATION_NEXT_COLUMN,
  NAVIGATION_PREV_COLUMN,
  NAVIGATION_NEXT_ROW,
  NAVIGATION_PREV_ROW
} from "./types";
import textGenerator from "../lib/text-generator";
import { calcPageCount } from "../lib/pagination";

const initialState: GridState = {
  articles: [],
  page: 0,
  cursorIndex: 0
};

const reducer = (
  state: GridState = initialState,
  action: ActionTypes
): GridState => {
  let articleIndex;
  switch (action.type) {
    case GET_TOP_STORIES_SUCCESS:
      return {
        ...state,
        articles: action.payload.ids.map(id => ({
          id,
          loading: false,
          expanded: false,
          article: undefined
        }))
      };
    case LOAD_ARTICLE:
      articleIndex = state.articles.findIndex(
        el => el.id === action.payload.id
      );
      return {
        ...state,
        articles: [
          ...state.articles.slice(0, articleIndex),
          {
            id: action.payload.id,
            loading: true,
            expanded: false,
            article: undefined
          },
          ...state.articles.slice(articleIndex + 1, state.articles.length)
        ]
      };
    case LOAD_ARTICLE_SUCCESS:
      articleIndex = state.articles.findIndex(
        el => el.id === action.payload.id
      );
      const { data: articleData } = action.payload;
      return {
        ...state,
        articles: [
          ...state.articles.slice(0, articleIndex),
          {
            id: action.payload.id,
            loading: false,
            expanded: false,
            article: {
              author: articleData.by,
              score: articleData.score,
              title: articleData.title,
              text: textGenerator()
            }
          },
          ...state.articles.slice(articleIndex + 1, state.articles.length)
        ]
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page:
          action.payload.page > calcPageCount(state.articles.length)
            ? state.page
            : action.payload.page
      };
    case NEXT_PAGE:
      return {
        ...state,
        page:
          state.page >= calcPageCount(state.articles.length)
            ? state.page
            : state.page + 1,
        cursorIndex: 0
      };
    case PREV_PAGE:
      return {
        ...state,
        page: state.page > 0 ? state.page - 1 : 0,
        cursorIndex: 0
      };
    case TOGGLE_EXPANDED:
      articleIndex = action.payload.index
        ? action.payload.index
        : state.articles.findIndex(el => el.id === action.payload.id);
      return {
        ...state,
        articles: [
          ...state.articles.slice(0, articleIndex),
          {
            ...state.articles[articleIndex],
            expanded: !state.articles[articleIndex].expanded
          },
          ...state.articles.slice(articleIndex + 1, state.articles.length)
        ]
      };
    case NAVIGATION_NEXT_COLUMN:
      return {
        ...state,
        cursorIndex:
          state.cursorIndex >= 23 ? state.cursorIndex : state.cursorIndex + 1
      };
    case NAVIGATION_PREV_COLUMN:
      return {
        ...state,
        cursorIndex:
          state.cursorIndex <= 0 ? state.cursorIndex : state.cursorIndex - 1
      };
    case NAVIGATION_NEXT_ROW:
      return {
        ...state,
        cursorIndex:
          state.cursorIndex > 15 ? state.cursorIndex : state.cursorIndex + 8
      };
    case NAVIGATION_PREV_ROW:
      return {
        ...state,
        cursorIndex:
          state.cursorIndex < 8 ? state.cursorIndex : state.cursorIndex - 8
      };
  }
  return state;
};

export default reducer;
