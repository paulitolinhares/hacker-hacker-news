import { ActionTypes, GridState } from "./types";

const initialState: GridState = {
  articles: []
};

const reducer = (
  state: GridState = initialState,
  action: ActionTypes
): GridState => {
  return state;
};

export default reducer;
