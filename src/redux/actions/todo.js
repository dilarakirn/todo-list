
import * as actiontypes from './actionTypes';

export const addTodo = (value) => {
    return {
        type: actiontypes.ADD_TODO,
        payload: value
    };
};

export const deleteTodo = (value) => {
    return {
        type: actiontypes.DELETE_TODO,
        payload: value
    };
};

export const toggleComplete = (value) => {
    return {
        type: actiontypes.TOGGLE_COMPLETE,
        payload: value
    };
};
