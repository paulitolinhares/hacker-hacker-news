import {
  ActionTypes,
  GET_TOP_STORIES,
  NEXT_PAGE,
  PREV_PAGE,
  TOGGLE_EXPANDED
} from "./types";

export function getTopStories(): ActionTypes {
  return {
    type: GET_TOP_STORIES
  };
}

export function nextPage(): ActionTypes {
  return {
    type: NEXT_PAGE
  };
}

export function prevPage(): ActionTypes {
  return {
    type: PREV_PAGE
  };
}

export function toggleExpanded(id: number): ActionTypes {
  return {
    type: TOGGLE_EXPANDED,
    payload: {
      id
    }
  };
}
