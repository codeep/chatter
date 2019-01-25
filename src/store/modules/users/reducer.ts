import { FETCH_CURRENT_SUCCESS, FETCH_SUCCESS } from './constants';
import { AnyAction } from 'redux';

import { State } from './types';

export const DEFAULT_STATE: State = {
  current: null,
};

const user = (state = DEFAULT_STATE, action: AnyAction) => {
  switch (action.type) {
    case FETCH_CURRENT_SUCCESS:
      return {
        ...state,
        current: action.response.result,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default user;
