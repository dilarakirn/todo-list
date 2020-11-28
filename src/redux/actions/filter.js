
import * as actiontypes from './actionTypes';

export const selectFilter = (value) => {
    return {
        type: actiontypes.SELECT_FILTER,
        payload: value
    };
};
