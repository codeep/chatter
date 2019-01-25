import * as constants from './constants';
import { user } from '../../schema';
import { ApiAction, CALL_API, Id } from '../../common';

export const fetchCurrent = (): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_CURRENT_REQUEST,
      constants.FETCH_CURRENT_SUCCESS,
      constants.FETCH_CURRENT_FAILURE,
    ],
    endpoint: `/users/current`,
    schema: user,
  },
});

export const fetchUser = (userId: number): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_REQUEST,
      constants.FETCH_SUCCESS,
      constants.FETCH_FAILURE,
    ],
    endpoint: `/users/${userId}`,
    schema: user,
  },
});
