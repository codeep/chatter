import * as constants from './constants';
import { ApiAction, CALL_API, Id } from '../../common';

export const signUp = (newUser: any): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.SIGN_UP_USER_REQUEST,
      constants.SIGN_UP_USER_SUCCESS,
      constants.SIGN_UP_USER_FAILURE,
    ],
    endpoint: `/auth/sign-up`,
    method: 'POST',
    body: newUser,
  },
});

export const signIn = (newUser: any): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.SIGN_IN_USER_REQUEST,
      constants.SIGN_IN_USER_SUCCESS,
      constants.SIGN_IN_USER_FAILURE,
    ],
    endpoint: `/auth/sign-in`,
    method: 'POST',
    body: newUser,
  },
});
