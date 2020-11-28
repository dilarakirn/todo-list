import React, { useState } from 'react';
import { connect } from 'react-redux'; // connect - high order component'i return eden bir func.
import * as actionCreators from '../../redux/actions/index';
import './AddTodo.css';

const AddTodo = (props) => {
  const [value, setValue] = useState('');

  const updateInput = (value) => {
    setValue(value);
  }

  const addTodo = (todo) => {
    setValue('');
    props.onAddTodo(value);
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