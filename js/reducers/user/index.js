// ------------------------------------
// Constants
// ------------------------------------
const GENERATE_USER_DATA = 'GENERATE_USER_DATA';
const CHANGE_USER_DATA = 'CHANGE_USER_DATA';

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [GENERATE_USER_DATA]: (state, action) => Object.assign({}, null, null),
    [CHANGE_USER_DATA]: (state, action) => Object.assign({}, null, null),
};

// ------------------------------------
// Reducer
// ------------------------------------
/* We are going to persist all joke info */
const initialState = {user: {name: '', email: '',}};
export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}