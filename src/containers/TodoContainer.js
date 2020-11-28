import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from '../components/Header/Header';
import AddTodo from '../components/AddTodo/AddTodo';
import TodoList from '../components/TodoList/TodoList';
import Filters from '../components/Filters/Filters';
import * as actionCreators from '../redux/actions/index';

const TodoContainer = () => {

  return(
    <div>
      <Header />
      <AddTodo />
      <TodoList />
      <Filters />
    </div>
  );
};

export default TodoContainer;