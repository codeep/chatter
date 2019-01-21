import React, { ComponentType } from 'react';
import App from 'pages/App';
import Auth from 'pages/Auth';
import Index from 'pages/App/pages/Index';
import SignUp from 'pages/Auth/pages/SignUp';
import SignIn from 'pages/Auth/pages/SignIn';

const Authenticated = (PageComponent: ComponentType, authRouth: boolean): any => (props: any): any => {
  const authToken = localStorage.getItem('auth-token');
  const authenticated = !!authToken;
  const { history } = props;

  if (authenticated !== authRouth) {
    history.push(authRouth ? '/sign-in' : '/');
  }

  return <PageComponent {...props} />;
};

const Root = (props: any): any => {
  const authToken = localStorage.getItem('auth-token');
  const authenticated = !!authToken;

  return authenticated ? <App {...props} /> : <Auth {...props} />;
};

const routes = [
  {
    path: '/',
    component: Root,
    routes: [
      {
        path: '/',
        component: Authenticated(Index, true),
        exact: true,
      },
      {
        path: '/sign-up',
        component: Authenticated(SignUp, false),
        exact: true,
      },
      {
        path: '/sign-in',
        component: Authenticated(SignIn, false),
        exact: true,
      },
    ],
  },
];

export default routes;
