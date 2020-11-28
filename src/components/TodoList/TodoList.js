import React from 'react';
import { connect } from 'react-redux'; // connect - high order component'i return eden bir func.
import './TodoList.css';              
import * as actionCreators from '../../redux/actions/index';
import getFilteredTodos from '../../redux/selectors/selector';

const TodoList = (props) => {
 
  const todoItem = (todo, index) => {
    return (
      <div className="TodoItem" key={`${index}${todo.label}`}>
        <p
          className={todo.completed ? 'TodoItemCompleted' : 'TodoItemLabel'}
          onClick={() => { props.onToggleComplete(todo.label)}}>
          {todo.label}</p>
        <button
          className="DeleteTodoButton"
          onClick={() => { props.onDeleteTodo(todo.label)}}>Delete</button>
      </div>
      )
  };

  return(
    <div className="TodoList">
      {props.filteredTodos && props.filteredTodos.length ? props.filteredTodos.map((todo, index) => {
        return todoItem(todo, index)
      }) : <p className="TodoItem">There is no item</p>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    todos: state.todoRdcr.todos, // todo reducer'ı combine edildiğinde oluşturduğun obje
    filters: state.filterRdcr.filters, // filter reducer'ı combine edildiğinde oluşturduğun obje
    filteredTodos: getFilteredTodos(state.todoRdcr.todos, state.filterRdcr.filters),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTodo: (todo) => dispatch(actionCreators.deleteTodo(todo)),
    onToggleComplete: (todo) => dispatch(actionCreators.toggleComplete(todo)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)