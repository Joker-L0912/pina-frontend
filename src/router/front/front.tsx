import { MenuRouteObject } from '../menuRouteObject';
import Login from '../../pages/Login/index';
import Home from '../../pages/Home';

const front: MenuRouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

export default front;
