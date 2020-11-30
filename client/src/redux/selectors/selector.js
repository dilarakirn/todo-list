/* selector for getting filtered todos */

const getFilteredTodos = (todos, filters) => {
  const getSelectedFilter = filters.filter(item => item.selected);
  switch(getSelectedFilter[0].label) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'incompleted':
      return todos.filter((todo) => !todo.completed);
    default:
      return;
  }
}

export default getFilteredTodos;