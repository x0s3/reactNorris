// ------------------------------------
// Imports
// ------------------------------------
import { NativeModules } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import { urlApi } from '../../utils/chuckApi';
import makeOfflineInterceptable from '../../utils/offlineHelper';

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_JOKES = 'FETCH_JOKES';
const SAVE_JOKE = 'SAVE_JOKE';
const DELETE_JOKE = 'DELETE_JOKE';

// ------------------------------------
// Actions
// ------------------------------------
export const getJokes = (number = 10) => makeOfflineInterceptable(
    async (dispatch, getState) => {
        let fetchedJokes = null;
        try {
            let arrayJokes = [];
            _.times(number, () => {
                arrayJokes.push(axios.get(urlApi));
            });
            const jokesInfo = await Promise.all(arrayJokes);
            fetchedJokes = jokesInfo.map(data => (
                { value: data.data.value, id: data.data.id.concat(Math.random()) }
            ));
        } catch (error) {
            console.warn(error)
        }
        dispatch({
            type: FETCH_JOKES,
            payload: {
                first_fetch: false,
                fetched_jokes: [...getState().jokes.fetched_jokes, ...fetchedJokes]
            },
        })
    }
);

export const getGolangJokes = () => makeOfflineInterceptable(
    async(dispatch, getState) => {
        let fetchedJokes = [];
        try {
            const jokes = await NativeModules.GoNorris.getGoJokes();
            JSON.parse(jokes).forEach(joke => fetchedJokes.push(joke));
        } catch (error) {
            console.warn(error)
        }
        dispatch({
            type: FETCH_JOKES,
            payload: {
                first_fetch: false,
                fetched_jokes: [...getState().jokes.fetched_jokes, ...fetchedJokes]
            },
        })
    }
)

export const saveJoke = ({ joke }) => async (dispatch, getState) => {
    let savedJokes = getState().jokes.saved_jokes;
    dispatch({
        type: SAVE_JOKE,
        payload: { saved_jokes: [...savedJokes, joke] }
    });
};

/**
 * OnLongPress your stored joke it will dispatch this action
 * */
export const deleteJoke = ({ joke }) => async (dispatch, getState) => {
    const newJokesSaved = _.filter(getState().jokes.saved_jokes, (currentJoke) => {
        return currentJoke.id !== joke.id;
    });
    dispatch({
        type: DELETE_JOKE,
        payload: { saved_jokes: [...newJokesSaved] }
    });
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [FETCH_JOKES]: (state, action) => Object.assign({}, state, action.payload),
    [SAVE_JOKE]: (state, action) => Object.assign({}, state, action.payload),
    [DELETE_JOKE]: (state, action) => Object.assign({}, state, action.payload),
};

// ------------------------------------
// Reducer
// ------------------------------------
/* We are going to persist all jokes that the user wants with redux-persist :) */
const initialState = { fetched_jokes: [], first_fetch: false, saved_jokes: [] };
export default function jokesReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}