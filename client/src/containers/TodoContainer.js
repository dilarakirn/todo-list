import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import axios from '../utils/axios';

import Header from '../components/Header/Header';
import AddTodo from '../components/AddTodo/AddTodo';
import TodoList from '../components/TodoList/TodoList';
import Filters from '../components/Filters/Filters';
import * as actionCreators from '../redux/actions/index';
import constants from '../resources/constants';
import './TodoContainer.css';   

const TodoContainer = (props) => {

  useEffect(() => {
    console.log('TodoContainer - ComponentDidMount');
    async function getTodosApi() {
      try {
        const response = await axios.get(constants.API_GET_TODOS);
        if (response.data) {
          props.onUpdateTodos(response.data);
        }
      } catch (err) {
        console.log('getTodosApi err', err);
      }
    }
    getTodosApi();
  }, []);

  return(
    <div>
      <Header />
      <div className="HeaderContainer">
        <div className="AddTodo">
          <AddTodo />
        </div>
        <div className="Filters">
        <Filters />
        </div>
      </div>
      <TodoList />
      
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTodos: (todoArr) => dispatch(actionCreators.updateTodos(todoArr))
  }
};

export default connect(null, mapDispatchToProps)(TodoContainer)