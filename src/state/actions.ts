import { ActionTypes, GET_TOP_STORIES } from "./types";

export function getTopStories(): ActionTypes {
  return {
    type: GET_TOP_STORIES
  };
}
