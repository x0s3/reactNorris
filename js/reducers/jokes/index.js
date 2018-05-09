// ------------------------------------
// Imports
// ------------------------------------
import axios from 'axios';
import _ from 'lodash';
import {urlApi} from '../../utils/chuckApi';

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_JOKES = 'FETCH_JOKES';
const SAVE_JOKE = 'SAVE_JOKE';
const DELETE_JOKE = 'DELETE_JOKE';

// ------------------------------------
// Actions
// ------------------------------------
export const getJokes = (number = 10) => async (dispatch, getState) => {
    let fetchedJokes = null;
    try {
        let arrayJokes = [];
        _.times(number, () => {
            arrayJokes.push(axios.get(urlApi));
        });
        const jokesInfo = await Promise.all(arrayJokes);
        fetchedJokes = jokesInfo.map(data => (
            {value: data.data.value, id: data.data.id}
        ));
    } catch (error) {
        console.warn(error)
    }
    dispatch({
        type: FETCH_JOKES,
        payload: {fetching: false, fetched_jokes: [...getState().jokes.fetched_jokes, ...fetchedJokes]}
    })
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [FETCH_JOKES]: (state, action) => Object.assign({}, state, action.payload),
    [SAVE_JOKE]: (state, action) => Object.assign({}, null, null),
    [DELETE_JOKE]: (state, action) => Object.assign({}, null, null),
};

// ------------------------------------
// Reducer
// ------------------------------------
/* We are going to persist saved_jokes with redux-persist */
const initialState = {fetched_jokes: [], fetching: true, saved_jokes: []};
export default function jokesReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}