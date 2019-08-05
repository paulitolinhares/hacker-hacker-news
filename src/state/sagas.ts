import { call, put, takeEvery, all, select } from "redux-saga/effects";
import API from "../lib/api";
import {
  GET_TOP_STORIES,
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  LoadArticleSuccessAction,
  GET_TOP_STORIES_SUCCESS,
  CHANGE_PAGE,
  NEXT_PAGE,
  PREV_PAGE
} from "./types";
import { getCurrentPageArticles } from "../lib/pagination";

function* fetchTopStories() {
  try {
    const ids = yield call(API.getTopStories);
    yield put({
      type: GET_TOP_STORIES_SUCCESS,
      payload: {
        ids
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchArticle(action: LoadArticleSuccessAction) {
  const { id } = action.payload;
  const article = yield call(API.getArticle, id);
  yield put({ type: LOAD_ARTICLE_SUCCESS, payload: { id: id, data: article } });
}

function* fetchPage() {
  const { articles, page } = yield select();
  const paginatedArticles = getCurrentPageArticles(articles, page);
  for (let i = 0; i < paginatedArticles.length; i++) {
    const currentArticle = paginatedArticles[i];
    // Only load those which have not been loaded yet
    if (!currentArticle.article) {
      yield put({ type: LOAD_ARTICLE, payload: { id: currentArticle.id } });
    }
  }
}

function* watchLoadArticle() {
  yield takeEvery(LOAD_ARTICLE, fetchArticle);
}

function* watchGetTopStories() {
  yield takeEvery(GET_TOP_STORIES, fetchTopStories);
}

function* watchGetTopStoriesSuccess() {
  yield takeEvery(GET_TOP_STORIES_SUCCESS, fetchPage);
  yield takeEvery(CHANGE_PAGE, fetchPage);
  yield takeEvery(NEXT_PAGE, fetchPage);
  yield takeEvery(PREV_PAGE, fetchPage);
}

export default function* rootSaga() {
  yield all([
    watchGetTopStories(),
    watchGetTopStoriesSuccess(),
    watchLoadArticle()
  ]);
}
