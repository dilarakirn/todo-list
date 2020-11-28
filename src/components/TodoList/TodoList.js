import React from 'react';
import { connect } from 'react-redux'; // connect - high order component'i return eden bir func.
import './TodoList.css';              
import * as actionCreators from '../../redux/actions/index';
import getFilteredTodos from '../../redux/selectors/selector';
import axios from '../../utils/axios';
import constants from '../../resources/constants';

const TodoList = (props) => {

  const deleteTodoApi = async (id) => {
    // delete from db then update redux
    try {
      const response = await axios.delete(`${constants.API_DELETE_TODO}${id}`);
      if (response.data) {
        props.onDeleteTodo(id);
      }
    } catch (err) {
      console.log('deleteTodoApi err', err);
    }
  };

  const updateTodoApi = async (id) => {
    // update to db then update redux
    try {
      const todoItemIndex = props.filteredTodos.findIndex(todo => todo._id === id)
      const updatedTodo = {
        ...props.filteredTodos[todoItemIndex],
        completed: !props.filteredTodos[todoItemIndex].completed,
      };
      console.log('updatedTodo', updatedTodo);
      const response = await axios.put(`${constants.API_UPDATE_TODO}${id}`, updatedTodo);
      console.log('updatedTodo', response);
      if (response.data) {
        props.onUpdateTodo(updatedTodo)
      }
    } catch (err) {
      console.log('updateTodoApi err', err);
    }
  };
 
  const todoItem = (todo, index) => {
    return (
      <div className="TodoItem" key={`${index}${todo.label}`}>
        <p
          className={todo.completed ? 'TodoItemCompleted' : 'TodoItemLabel'}
          onClick={() => { updateTodoApi(todo._id)}}>
          {todo.label}</p>
        <button
          className="DeleteTodoButton"
          onClick={() => { deleteTodoApi(todo._id)}}>Delete</button>
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
    onDeleteTodo: (id) => dispatch(actionCreators.deleteTodo(id)),
    onUpdateTodo: (todo) => dispatch(actionCreators.updateTodo(todo)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)