import React from 'react';
import { connect } from 'react-redux'; // connect - high order component'i return eden bir func.
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IconContext } from 'react-icons';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

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
      <tr key={todo._id}>
        <td>
          <Form.Group controlId={todo._id} className="FormGroup">
            <Form.Check type="checkbox" label={todo.description} checked={todo.completed} onChange={() => { updateTodoApi(todo._id)}}/>
          </Form.Group>
        </td>
        <td>
          <Button className="Button" size="sm" variant="success" onClick={() => { updateTodoApi(todo._id)}}>
          <IconContext.Provider value={{ color: 'white', size: '1.5vw', style: { verticalAlign: 'middle' } }}>
            <FiEdit2/>
          </IconContext.Provider>
           
          </Button>
          <Button className="Button" size="sm" variant="danger" onClick={() => { deleteTodoApi(todo._id)}}>
            <IconContext.Provider value={{ color: 'white', size: '1.5vw', style: { verticalAlign: 'middle' } }}>
             <FiTrash2/>
            </IconContext.Provider>
          </Button>
        </td>
        <td>
        </td>
      </tr>
    );
  };

  return(
    <div className="table-wrapper">
      <Table hover>
        <tbody>
        {(props.filteredTodos && props.filteredTodos.length) ? props.filteredTodos.map((todo, index) => {
          return todoItem(todo, index)
        }) : null}
        </tbody>
      </Table>
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