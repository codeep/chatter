import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Grid from '@material-ui/core/Grid';

import NavBar from '../../components/NavBar';

type Props = {
  route?: RouteConfig;
};

const App = (props: Props) => {
  const { route = {} } = props;

  return (
    <>
      <NavBar />
      <Grid container justify="center">
        {renderRoutes(route.routes)}
      </Grid>
    </>
  );
};

export default App;
