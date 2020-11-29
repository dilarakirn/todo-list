import React, { useState } from 'react';
import { connect } from 'react-redux'; // connect - high order component'i return eden bir func.
import Modal from '../TodoModal/TodoModal';
import Button from 'react-bootstrap/Button';
import { IconContext } from 'react-icons';
import { GrAdd } from 'react-icons/gr';
import * as actionCreators from '../../redux/actions/index';
import axios from '../../utils/axios';
import constants from '../../resources/constants';
import './AddTodo.css';

const AddTodo = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const addTodo = async (todo) => {
    setModalShow(false);
    try {
      const todoItem = {
        description: todo.description,
        deadline: todo.deadline,
        completed: false,
        labelColor: todo.labelColor,
      };
      const response = await axios.post(constants.API_POST_TODO, todoItem);
      if (response.data) {
        props.onAddTodo({...todoItem, _id: response.data._id});
      }
    } catch (err) {
      console.log('addTodoApi err', err);
    }
  }

  const renderModal = (props) => {
    return (
      <Modal
        modalShow={modalShow}
        onClose={() => { setModalShow(false); }}
        saveOnPress={(todoItem) => { addTodo(todoItem); }} />
    );
  };

  return(
    <div className="AddTodo">
      <Button size="sm" variant="primary" onClick={() => { setModalShow(true); }}>
        <IconContext.Provider value={{ color: "white", size: '2vw', style: { verticalAlign: 'middle' } }}>
          <GrAdd />
        </IconContext.Provider>
      </Button>
      {renderModal()}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (todo) => dispatch(actionCreators.addTodo(todo)),
  }
};

export default connect(null, mapDispatchToProps)(AddTodo);