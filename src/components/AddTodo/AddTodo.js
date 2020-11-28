import React, { useState } from 'react';
import { connect } from 'react-redux'; // connect - high order component'i return eden bir func.
import * as actionCreators from '../../redux/actions/index';
import axios from '../../utils/axios';
import constants from '../../resources/constants';
import './AddTodo.css';

const AddTodo = (props) => {
  const [value, setValue] = useState('');

  const updateInput = (value) => {
    setValue(value);
  }

  const addTodo = async () => {
    try {
      const todoItem = {
        label: value,
        completed: false,
      };
      const response = await axios.post(constants.API_POST_TODO, todoItem);
      if (response.data) {
        setValue('');
        props.onAddTodo(value);
      }
    } catch (err) {
      console.log('addTodoApi err', err);
    }
  }

  return(
    <div className="AddTodo">
      <input type="text" value={value} onChange={e => updateInput(e.target.value)} />
      <button className="AddButton" onClick={addTodo}>Add</button>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (todo) => dispatch(actionCreators.addTodo(todo)),
  }
};

export default connect(null, mapDispatchToProps)(AddTodo);