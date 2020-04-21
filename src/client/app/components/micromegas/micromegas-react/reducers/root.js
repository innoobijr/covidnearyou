import { handleActions } from "redux-actions";
import { keplerGlInit } from "../actions/actions";
import { coreReducerFactory } from "./core";
import ActionTypes from "../constants/action-types";

// INITIAL_STATE
const initialCoreState = {};

export function provideInitialState(initialState) {
  const coreReducer = coreReducerFactory(initialState);

	const handeRegisterEntry = (
		state, 
		{payload: {id, mint, mapboxApiAccessToken, mapboxApiUrl, mapStylesReplaceDefault}}
		 ) => {
		 	const previousState = state[id] && mint === false ? state[id] : undefined;

			 return {
			 	..state, 
				 [id]: coreReducer(
				 	previousState,
					 keplerGlInit({mapboxApiAccessToken, mapboxApiUrl, mapStylesReplaceDefault})
				 )
			 };
		 };

	return (state = initialCoreState, action) => {
		return handleActions(
			{
				[ActionTypes.REGISTER_ENTRY]: handleRegisterEntry
			},
			initialCoreState
		)(state, action);
	};
}

const _keplerGlReducer = provideInitialState();

function decorate(target, savedInitialState = {}) {
  const targetInitialState = savedInitialState;

	target.initialState = function initialState(iniSt) {
		const targetReducer = provideInitialState(iniSt);
		return decorate(targetReducer,iniSt);
	};
	return target;
}

const keplerGlReducer = decorate(_keplerGlReducer);
export default keplerGlReducer;
