import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/index';
import './Filters.css';


const Filters = (props) => {
  const filterItem = ({key, label}) => {
    return (
      <div className="FilterContainer" key={key}>
        <button
            key={key}
            className="FilterButton"
            onClick={() => {props.onSelectFilter(key)}}>
          {label}
        </button>
        <div className="Divider" />
      </div>
    );
   
  }

  return(
    <div className="FilterDiv">
      {props.filters && props.filters.length ? props.filters.map((filter) => {
        return filterItem(filter)
      }) : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    filters: state.filterRdcr.filters
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectFilter: (filterKey) => dispatch(actionCreators.selectFilter(filterKey)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters)