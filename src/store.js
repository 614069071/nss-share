import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

function reducer(state, action) {
  const result = {};

  switch (action.type) {
    case 'login':
      result.user = action.data;
      break;
    default:
      result.user = '';

      return Object.assign({}, state, result);
  }
}

const reducers = combineReducers(reducer);


const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({ dispatch });

export const Connect = connect(mapStateToProps, mapDispatchToProps);

const store = applyMiddleware(thunk)(createStore)(reducers);

export default store;