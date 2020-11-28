
import * as actiontypes from './actionTypes';

export const updateTodo = (value) => {
    return {
        type: actiontypes.UPDATE_TODO,
        payload: value
    };
};

export const updateTodos = (value) => {
    return {
        type: actiontypes.UPDATE_TODOS,
        payload: value
    };
};

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
