import * as actionTypes from '../actions/actionTypes';

const initialState = {
  todos: [
    { label: 'todo1', completed: false },
    { label: 'todo2', completed: false },
    { label: 'todo3', completed: false },
  ],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case actionTypes.ADD_TODO: {
        const todoItem = {label: action.payload, completed: false };
        return {
          ...state,
          todos: state.todos.concat(todoItem)
        };
      }
      case actionTypes.DELETE_TODO: {
        let copyTodos = [...state.todos];
        const itemIndex = copyTodos.findIndex(todo => todo.label === action.payload);
        copyTodos.splice(itemIndex, 1);
        return {
          ...state,
          todos: copyTodos
        };
      }
      case actionTypes.TOGGLE_COMPLETE: {
        let copyTodos = [...state.todos];
        const itemIndex = copyTodos.findIndex(todo => todo.label === action.payload);
        copyTodos[itemIndex] = {
          ...copyTodos[itemIndex],
          completed: !copyTodos[itemIndex].completed,
        };

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