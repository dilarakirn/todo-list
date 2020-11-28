import * as actionTypes from '../actions/actionTypes';

const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case actionTypes.UPDATE_TODOS: {
        return {
          ...state,
          todos: action.payload,
        };
      }
      case actionTypes.ADD_TODO: {
        const todoItem = {label: action.payload, completed: false };
        return {
          ...state,
          todos: state.todos.concat(todoItem)
        };
      }
      case actionTypes.DELETE_TODO: {
        let copyTodos = [...state.todos];
        const itemIndex = copyTodos.findIndex(todo => todo._id === action.payload);
        copyTodos.splice(itemIndex, 1);
        return {
          ...state,
          todos: copyTodos
        };
      }
      case actionTypes.UPDATE_TODO: {
        let copyTodos = [...state.todos];
        const itemIndex = copyTodos.findIndex(todo => todo._id === action.payload._id);
        copyTodos[itemIndex] = action.payload;
        return {
          ...state,
          todos: copyTodos,
        };
      }
      default: {
        return state;
      }
    }
};

export default reducer;