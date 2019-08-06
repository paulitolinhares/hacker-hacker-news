import {
  GET_TOP_STORIES_SUCCESS,
  GetTopStoriesSuccessAction,
  LOAD_ARTICLE,
  LoadArticleAction,
  LoadArticleSuccessAction,
  LOAD_ARTICLE_SUCCESS,
  ArticleState,
  ChangePageAction,
  CHANGE_PAGE,
  NextPageAction,
  NEXT_PAGE,
  PrevPageAction,
  PREV_PAGE,
  ToggleExpandedAction,
  TOGGLE_EXPANDED,
  NavigationNextColumnAction,
  NAVIGATION_NEXT_COLUMN,
  NavigationPrevColumnAction,
  NAVIGATION_PREV_COLUMN,
  NavigationNextRowAction,
  NAVIGATION_NEXT_ROW,
  NavigationPrevRowAction,
  NAVIGATION_PREV_ROW,
  ToggleModalAction,
  TOGGLE_MODAL
} from "./types";
import reducer, { initialState } from "./reducer";
import textGenerator from "../lib/text-generator";
describe("Reducer", () => {
  describe("GET_TOP_STORIES_SUCCESS", () => {
    const ids = [1, 2, 3];
    it("should add the ids to the articles array", () => {
      const action: GetTopStoriesSuccessAction = {
        type: GET_TOP_STORIES_SUCCESS,
        payload: {
          ids
        }
      };
      const newState = reducer(null, action);
      const newIds = newState.articles.map(({ id }) => id);

      expect(newIds).toEqual(ids);
    });
  });
  describe("LOAD_ARTICLE", () => {
    it("should set the loading property to true", () => {
      const startingState = {
        ...initialState,
        articles: [
          {
            id: 1,
            loading: false,
            expanded: false,
            article: undefined
          }
        ]
      };
      const action: LoadArticleAction = {
        type: LOAD_ARTICLE,
        payload: {
          id: startingState.articles[0].id
        }
      };
      const newState = reducer(startingState, action);
      const articleFromstate = newState.articles.find(
        ({ id }) => id === startingState.articles[0].id
      );

      expect(articleFromstate.article).toBeUndefined();
      expect(articleFromstate.loading).toBe(true);
    });
  });
  describe("LOAD_ARTICLE_SUCCESS", () => {
    it("should set the article to the correct id", () => {
      const startingState = {
        ...initialState,
        articles: [
          {
            id: 1,
            loading: true,
            expanded: false,
            article: undefined
          }
        ]
      };

      const action: LoadArticleSuccessAction = {
        type: LOAD_ARTICLE_SUCCESS,
        payload: {
          id: startingState.articles[0].id,
          data: {
            by: "Test author",
            title: "Hello world",
            score: 155
          }
        }
      };

      const newState = reducer(startingState, action);
      const newStateArticle = newState.articles.find(
        ({ id }) => id === startingState.articles[0].id
      );

      expect(newStateArticle.loading).toBe(false);
      expect(newStateArticle.article.author).toEqual(action.payload.data.by);
      expect(newStateArticle.article.title).toEqual(action.payload.data.title);
      expect(newStateArticle.article.score).toEqual(action.payload.data.score);
      expect(newStateArticle.article.text).toEqual(textGenerator());
    });
  });
  describe("CHANGE_PAGE", () => {
    // Generate enough articles to have pagination (5 pages)
    const articles: ArticleState[] = Array.from(Array(100).keys()).map(i => ({
      id: i,
      loading: false,
      expanded: false,
      article: {
        author: "Author",
        title: "Title",
        text: "blablabla",
        score: 155
      }
    }));
    const startingState = {
      ...initialState,
      page: 0,
      articles
    };

    it("should do nothing for negative page values", () => {
      const action: ChangePageAction = {
        type: CHANGE_PAGE,
        payload: {
          page: -1
        }
      };
      const newState = reducer(startingState, action);

      expect(newState.page).toEqual(0);
    });

    it("should do nothing when more page is bigger than what the article array size allows", () => {
      const action: ChangePageAction = {
        type: CHANGE_PAGE,
        payload: {
          page: 10
        }
      };
      const newState = reducer(startingState, action);

      expect(newState.page).toEqual(0);
    });

    it("should change the page when the value is within the correct bounds", () => {
      const action: ChangePageAction = {
        type: CHANGE_PAGE,
        payload: {
          page: 3
        }
      };

      const newState = reducer(startingState, action);

      expect(newState.page).toEqual(action.payload.page);
    });
  });
  describe("NEXT_PAGE", () => {
    // Generate enough articles to have pagination (5 pages)
    const articles: ArticleState[] = Array.from(Array(100).keys()).map(i => ({
      id: i,
      loading: false,
      expanded: false,
      article: {
        author: "Author",
        title: "Title",
        text: "blablabla",
        score: 155
      }
    }));
    const action: NextPageAction = {
      type: NEXT_PAGE
    };
    it("should do nothing when in last page", () => {
      const startingState = {
        ...initialState,
        page: 5,
        articles
      };
      const newState = reducer(startingState, action);

      expect(newState.page).toEqual(startingState.page);
    });
    it("should increase page by one when whthin the correct bounds", () => {
      const startingState = {
        ...initialState,
        page: 3,
        articles
      };
      const newState = reducer(startingState, action);

      expect(newState.page).toEqual(startingState.page + 1);
    });
  });
  describe("PREV_PAGE", () => {
    // Generate enough articles to have pagination (5 pages)
    const articles: ArticleState[] = Array.from(Array(100).keys()).map(i => ({
      id: i,
      loading: false,
      expanded: false,
      article: {
        author: "Author",
        title: "Title",
        text: "blablabla",
        score: 155
      }
    }));
    const action: PrevPageAction = {
      type: PREV_PAGE
    };
    it("should do nothing when in first page", () => {
      const startingState = {
        ...initialState,
        page: 0,
        articles
      };
      const newState = reducer(startingState, action);

      expect(newState.page).toEqual(startingState.page);
    });
    it("should decrease page by one when whthin the correct bounds", () => {
      const startingState = {
        ...initialState,
        page: 3,
        articles
      };
      const newState = reducer(startingState, action);

      expect(newState.page).toEqual(startingState.page - 1);
    });
  });
  describe("TOGGLE_EXPANDED", () => {
    // Generating some articles
    const articles: ArticleState[] = Array.from(Array(5).keys()).map(i => ({
      id: i,
      loading: false,
      expanded: false,
      article: {
        author: "Author",
        title: "Title",
        text: "blablabla",
        score: 155
      }
    }));
    const startingState = {
      ...initialState,
      articles
    };

    it("should toggle by index", () => {
      const action: ToggleExpandedAction = {
        type: TOGGLE_EXPANDED,
        payload: {
          index: 0
        }
      };
      const newState = reducer(startingState, action);
      expect(newState.articles[action.payload.index].expanded).toBe(true);
    });
    it("should toggle by id", () => {
      const action: ToggleExpandedAction = {
        type: TOGGLE_EXPANDED,
        payload: {
          id: 0
        }
      };
      const newState = reducer(startingState, action);
      const newArticle = newState.articles.find(
        ({ id }) => id === action.payload.id
      );
      expect(newArticle.expanded).toBe(true);
    });
  });
  describe("NAVIGATION_NEXT_COLUMN", () => {
    const action: NavigationNextColumnAction = {
      type: NAVIGATION_NEXT_COLUMN
    };

    it("should not allow cursor to be greater than 23", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 23
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(23);
    });

    it("should increase the cursorIndex by 1 when it's less than 23", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 0
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(1);
    });
  });
  describe("NAVIGATION_PREV_COLUMN", () => {
    const action: NavigationPrevColumnAction = {
      type: NAVIGATION_PREV_COLUMN
    };

    it("should not allow cursor to be lesser than 0", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 0
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(0);
    });

    it("should decrease the cursorIndex by 1 when it's greater than 0", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 20
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(19);
    });
  });
  describe("NAVIGATION_NEXT_ROW", () => {
    const action: NavigationNextRowAction = {
      type: NAVIGATION_NEXT_ROW
    };

    it("should not allow cursor to be greater than 23 (starting from 16)", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 16
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(16);
    });

    it("should increase the cursorIndex by 8 when it's less than 23", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 0
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(8);
    });
  });
  describe("NAVIGATION_PREV_ROW", () => {
    const action: NavigationPrevRowAction = {
      type: NAVIGATION_PREV_ROW
    };

    it("should not allow cursor to be lesser than 0 (starting from 8)", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 6
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(6);
    });

    it("should decrease the cursorIndex by 8 when it's greater than 0", () => {
      const startingState = {
        ...initialState,
        cursorIndex: 20
      };
      const newState = reducer(startingState, action);
      expect(newState.cursorIndex).toEqual(12);
    });
  });
  describe("TOGGLE_MODAL", () => {
    it("should toggleModal flag", () => {
      const action: ToggleModalAction = {
        type: TOGGLE_MODAL
      };

      const startingState = {
        ...initialState,
        isModalOpen: false
      };

      const newState = reducer(startingState, action);

      expect(newState.isModalOpen).toBe(true);
    });
  });
});
