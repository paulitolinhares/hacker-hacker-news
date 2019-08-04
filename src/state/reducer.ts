import {
  ActionTypes,
  GridState,
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  GET_TOP_STORIES_SUCCESS,
  CHANGE_PAGE
} from "./types";
import textGenerator from "../lib/text-generator";

const initialState: GridState = {
  articles: [],
  page: 0
};

const reducer = (
  state: GridState = initialState,
  action: ActionTypes
): GridState => {
  switch (action.type) {
    case GET_TOP_STORIES_SUCCESS:
      return {
        ...state,
        articles: action.payload.ids.map(id => ({
          id,
          loading: true,
          expanded: false,
          article: undefined
        }))
      };
    case LOAD_ARTICLE:
      return {
        ...state,
        articles: [
          ...state.articles,
          {
            id: action.payload.id,
            loading: true,
            expanded: false,
            article: undefined
          }
        ]
      };
    case LOAD_ARTICLE_SUCCESS:
      const articleIndex = state.articles.findIndex(
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
        page: action.payload.page
      };
  }
  return state;
};

export default reducer;
