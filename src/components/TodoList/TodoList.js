import React, { useState } from 'react';
import { connect } from 'react-redux'; // connect - high order component'i return eden bir func.
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IconContext } from 'react-icons';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import './TodoList.css';
import Modal from '../TodoModal/TodoModal';
import * as actionCreators from '../../redux/actions/index';
import getFilteredTodos from '../../redux/selectors/selector';
import axios from '../../utils/axios';
import constants from '../../resources/constants';

const TodoList = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedTodoItem, setSelectedTodoItem] = useState(null);

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

  const updateTodoApi = async (todo, action) => {
    // update to db then update redux
    try {
      let updatedTodo = {};
      if (action === 'updateStatus') {
        const todoItemIndex = props.filteredTodos.findIndex(todoItem => todoItem._id === todo);
        updatedTodo = {
          ...props.filteredTodos[todoItemIndex],
          completed: !props.filteredTodos[todoItemIndex].completed,
        };
      } else {
        const todoItemIndex = props.filteredTodos.findIndex(todoItem => todoItem._id === selectedTodoItem._id);
        updatedTodo = {
          ...props.filteredTodos[todoItemIndex],
          description: todo.description,
          deadline: todo.deadline,
          labelColor: todo.labelColor,
        };
      }
      const response = await axios.put(`${constants.API_UPDATE_TODO}${updatedTodo._id}`, updatedTodo);
      if (response.data) {
        props.onUpdateTodo(updatedTodo)
      }
    } catch (err) {
      console.log('updateTodoApi err', err);
    }
  };

  const todoItemEditPress = (id) => {
    const todoItemIndex = props.filteredTodos.findIndex(todoItem => todoItem._id === id);
    if (todoItemIndex !== -1) {
      const todoItem = props.filteredTodos[todoItemIndex];
      setSelectedTodoItem(todoItem);
    }
    setModalShow(true);
  };

  const todoItemCheckPress = (id) => {
    updateTodoApi(id, 'updateStatus');
  }

  const renderModal = (props) => {
    return (
      <Modal
        todo={selectedTodoItem}
        modalShow={modalShow}
        onClose={() => { setModalShow(false); }}
        saveOnPress={(todo) => { updateTodoApi(todo, 'updateTodo'); }} />
    );
  };

  const convertDateFormat = (date) => {
    if (!date) return;
    const splittedDate = date.split("-");
    return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`
  }

  const remainDayToTask = (taskDeadline) => {
    let convertedDeadline = '';
    if (taskDeadline ) {
      const splittedDate = taskDeadline.split("-");
      convertedDeadline = `${splittedDate[1]}/${splittedDate[2]}/${splittedDate[0]}`
    }

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const date1 = new Date(convertedDeadline);
    const date2 = new Date(today);
    const diffTime = (date1 - date2);

    if (diffTime < 0) return 'Time is up!';

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day`;
  }
 
  const todoItem = (todo, index) => {
    return (
      <tr key={todo._id}>
         <td>
          <p>{index}</p>
        </td>
        <td>
          <Form.Group controlId={todo._id} className="FormGroup">
            <Form.Check type="checkbox" label={todo.description} checked={todo.completed} onChange={() => { todoItemCheckPress(todo._id); }}/>
          </Form.Group>
        </td>
        <td>
          <Form.Group controlId={todo.deadline} className="FormGroup">
            <Form.Label>{convertDateFormat(todo.deadline)}</Form.Label>
          </Form.Group>
        </td>
        <td>
          <Form.Group controlId="remainDay" className="FormGroup">
            <Form.Label>{`${remainDayToTask(todo.deadline)}`}</Form.Label>
          </Form.Group>
        </td>
        <td>
          <Form.Group controlId={todo.labelColor} className="FormGroup">
            <Form.Label>
              <div className="ColorLabel" style={{backgroundColor: todo.labelColor}}/>
            </Form.Label>
          </Form.Group>
        </td>
        <td>
          <Button className="EditDeleteButton" size="sm" variant="success" onClick={() => { todoItemEditPress(todo._id); }}>
          <IconContext.Provider value={{ color: 'white', size: '1.5vw', style: { verticalAlign: 'middle' } }}>
            <FiEdit2/>
          </IconContext.Provider>
           
          </Button>
          <Button className="EditDeleteButton" size="sm" variant="danger" onClick={() => { deleteTodoApi(todo._id)}}>
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
    <div className="TodoListContainer">
      <Table hover className="TodoListTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Deadline to Task</th>
            <th>Remain Day to Task</th>
            <th>Label Color of Task</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {(props.filteredTodos && props.filteredTodos.length) ? props.filteredTodos.map((todo, index) => {
          return todoItem(todo, index)
        }) : null}
        </tbody>
      </Table>
      {renderModal()}
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