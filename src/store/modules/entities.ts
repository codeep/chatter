import { mergeWith } from 'lodash';
import { AnyAction } from 'redux';

import { common } from '../';

type Entity<T> = {
  [key: number]: T;
};

export type User = {
  id: common.Id;
  firstName: string;
  lastName: string;
  emailOrPassword: string;
  birthDay: string;
  gender: string;
};

export type Conversation = {
  id: common.Id;
  interlocutorId: common.Id;
  interlocutor: User;
  lastMessage: object;
};

export type State = {
  users: Entity<User>;
};

const DEFAULT_STATE: State = {
  users: {},
};

// Updates an entity cache in response to any action with response.entities.
export const reducer = (state = DEFAULT_STATE, action: AnyAction) => {
  if (action.response && action.response.entities) {
    return mergeWith({}, state, action.response.entities);
  }

  return state;
};
