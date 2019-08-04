import { call, put, takeEvery, all } from "redux-saga/effects";
import API from "../lib/api";
import {
  GET_TOP_STORIES,
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  LoadArticleSuccessAction
} from "./types";

function* fetchTopStories() {
  try {
    const ids = yield call(API.getTopStories);
    for (let i = 0; i < 24; i++) {
      // TODO remove the 24 limit
      yield put({ type: LOAD_ARTICLE, payload: { id: ids[i] } });
    }
    console.log({ ids });
  } catch (error) {
    console.log(error);
  }
}

function* fetchArticle(action: LoadArticleSuccessAction) {
  const { id } = action.payload;
  const article = yield call(API.getArticle, id);
  yield put({ type: LOAD_ARTICLE_SUCCESS, payload: { id: id, data: article } });
}

function* watchLoadArticle() {
  yield takeEvery(LOAD_ARTICLE, fetchArticle);
}

function* watchGetTopStories() {
  yield takeEvery(GET_TOP_STORIES, fetchTopStories);
}

export default function* rootSaga() {
  yield all([watchGetTopStories(), watchLoadArticle()]);
}
