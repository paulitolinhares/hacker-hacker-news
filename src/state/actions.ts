import {
  ActionTypes,
  GET_TOP_STORIES,
  NEXT_PAGE,
  PREV_PAGE,
  TOGGLE_EXPANDED,
  NAVIGATION_NEXT_ROW,
  NAVIGATION_NEXT_COLUMN,
  NAVIGATION_PREV_COLUMN,
  NAVIGATION_PREV_ROW
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

export function toggleExpanded({
  id,
  index
}: {
  id?: number;
  index?: number;
}): ActionTypes {
  return {
    type: TOGGLE_EXPANDED,
    payload: {
      id,
      index
    }
  };
}

export function navNextRow(): ActionTypes {
  return {
    type: NAVIGATION_NEXT_ROW
  };
}

export function navNextColumn(): ActionTypes {
  return {
    type: NAVIGATION_NEXT_COLUMN
  };
}

export function navPrevRow(): ActionTypes {
  return {
    type: NAVIGATION_PREV_ROW
  };
}

export function navPrevColumn(): ActionTypes {
  return {
    type: NAVIGATION_PREV_COLUMN
  };
}
