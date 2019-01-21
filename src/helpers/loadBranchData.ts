import { matchRoutes } from 'react-router-config';
import { match as matchDef } from 'react-router';
import { Store } from 'redux';

import routes from 'config/routes';
import { store } from '../';

export type LoadDataConfig = { match: matchDef<any>; store: Store };
export type LoadData = (config: LoadDataConfig) => Promise<any>;

const loadBranchData = (pathname: string) => {
  const branch = matchRoutes(routes, pathname);

  const promises = branch.map(({ route, match }) => {
    const component: any = route.component;
    const loadData: LoadData = component.loadData;

    return loadData ? loadData({ match, store }) : Promise.resolve(null);
  });

  return Promise.all(promises);
};

export default loadBranchData;
