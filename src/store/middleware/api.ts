import { normalize, Schema } from 'normalizr';
import { Store } from 'redux';
import { common } from '../';

const API_ROOT = 'http://localhost:3000';

interface Config {
  endpoint: string;
  method?: string;
  body?: object;
  schema?: Schema;
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (config: Config) => {
  const { endpoint, schema, body, method = 'GET' } = config;
  const stringBody = body && JSON.stringify(body);
  const fullUrl = API_ROOT + endpoint;
  const authToken = localStorage.getItem('auth-token');

  const headers = new Headers({
    'content-type': 'application/json',
    'Authorization': authToken || '',
  });

  const request = new Request(fullUrl, {
    body: stringBody,
    method,
    headers,
  });

  const response = await fetch(request);

  if (!response.ok) {
    throw response;
  }

  const json = await response.json().catch(() => ({}));

  return schema ? normalize(json, schema) : json;
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default () => (store: Store) => (next: any) => (
  action: common.ApiAction,
) => {
  const callAPI = action[common.CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { schema, types, method, body, endpoint } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Expected endpoint to be a string');
  }

  const actionWith = (data: {
    type: string;
    error?: string;
    response?: object;
    requestAction?: object;
  }) => {
    const finalAction = { ...action, ...data };
    delete finalAction[common.CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  const requestAction = actionWith({ type: requestType });

  next(requestAction);

  const config = { endpoint, schema, method, body };

  return callApi(config).then(
    response => {
      return next(
        actionWith({
          response,
          type: successType,
          requestAction,
        }),
      );
    },
    error => {
      return next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened',
          requestAction,
        }),
      );
    },
  );
};
