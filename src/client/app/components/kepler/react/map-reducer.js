import { createAction, handleActions } from "redux-actions";

// CONSTANTS
export const INIT = "INIT";

// ACTIONS
export const appInit = createAction(INIT);

// INITIAL_STATE
const initialState = {
  appName: "example",
  loaded: false,
};

// REDUCER
const mapReducer = handleActions(
  {
    [INIT]: (state, action) => ({
      ...state,
      loaded: true,
    }),
  },
  initialState
);

export default mapReducer;
