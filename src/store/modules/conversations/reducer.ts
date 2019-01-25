import { FETCH_LIST_SUCCESS } from './constants';
import { AnyAction } from 'redux';

const user = (state = [], action: AnyAction) => {
  switch (action.type) {
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.response.result,
      };

    default:
      return state;
  }
};

export default user;
