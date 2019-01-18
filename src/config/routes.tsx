import React from 'react';
import App from '../pages/App';
import Auth from '../pages/Auth';
import Index from '../pages/App/pages/Index';
import SignUp from '../pages/Auth/pages/SignUp';
import SignIn from '../pages/Auth/pages/SignIn';
import { Redirect } from 'react-router-dom';

const Authenticated = (C: any, authRouth: boolean) => (props: any) => {
  const authToken = localStorage.getItem('auth-token');
  const authenticated = !!authToken;

  if (authenticated !== authRouth) {
    return <Redirect to={authRouth ? '/sign-in' : '/'} />;
  };

  return <C {...props} />;
}

const Root = (props: any) => {
  const authToken = localStorage.getItem('auth-token');
  const authenticated = !!authToken;

  return authenticated ? <App {...props} /> : <Auth {...props} />;
}
 
const routes = [
  {
    path: '/',
    component: Root,
    routes: [
      {
        path: '/',
        component: Authenticated(Index, true),
        exact: true
      },
      {
        path: '/sign-up',
        component: Authenticated(SignUp, false),
        exact: true
      },
      {
        path: '/sign-in',
        component: Authenticated(SignIn, false),
        exact: true
      },
    ],
  },
];

export default routes;

