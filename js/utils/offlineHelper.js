// @flow

const makeOfflineInterceptable = (thunk, dismissingActions = []) => {
    thunk.interceptInOffline = true;
    thunk.meta = {
        retry: true,
        dismiss: dismissingActions,
    };

    return thunk;
};

export default makeOfflineInterceptable;