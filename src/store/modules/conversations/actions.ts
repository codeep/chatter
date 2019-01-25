import * as constants from './constants';
import { conversations } from '../../schema';
import { ApiAction, CALL_API, Id } from '../../common';

export const fetchList = (): ApiAction => ({
  [CALL_API]: {
    types: [
      constants.FETCH_LIST_REQUEST,
      constants.FETCH_LIST_SUCCESS,
      constants.FETCH_LIST_FAILURE,
    ],
    endpoint: `/chat/conversations`,
    schema: conversations,
  },
});