import { SIGN_UP_USER_SUCCESS, SIGN_IN_USER_SUCCESS } from './constants';
import { AnyAction } from 'redux';

const auth = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case SIGN_UP_USER_SUCCESS:
      return state;

    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        user: action.response.result,
      };

    default:
      return state;
  }
};

export default auth;
