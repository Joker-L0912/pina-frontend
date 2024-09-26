import { createBrowserRouter } from 'react-router-dom';
import Error404 from '../pages/Error404';
import { PieChartOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import Portal from '../layout/Portal';
import user from './modules/user';
import { MenuRouteObject } from './menuRouteObject';
import Home from '../pages/Home';
import Login from '@/pages/Login';
import project from './modules/project';

/**
 * 登录成功之后的路由和菜单配置
 */
const portalRouters: MenuRouteObject[] = [
  {
    path: 'home',
    element: <Home />,
  },
  { ...user },
  { ...project },
];


/**
 * 全部路由
 */
const routers: MenuRouteObject[] = [
  {
    path: '/',
    element: <Portal />,
    errorElement: <Error404 />,
    icon: <PieChartOutlined />,
    children: portalRouters,
  },
  // ...front,
  {
    path: '/login',
    element: <Login />,
  },
];

export type MenuItem = Required<MenuProps>['items'][number] & { children?: MenuItem[] | null };

const createMenuItems = (router: MenuRouteObject[] | undefined,
  key: string, topMenuOnly?: boolean): MenuItem[] => {
  return router ? router.map((item) => {
    return {
      key: key + processPath(item.path),
      icon: item.icon,
      children: !topMenuOnly && item.children ?
        createMenuItems(item.children, key + processPath(item.path), false) : null,
      label: item.label || item.path,
    } satisfies MenuItem;
  }) : [];
};


const processPath = (path: string | undefined): string => {
  if (path) {
    if (path.lastIndexOf('/') === path.length - 1) path = path.substring(0, path.length - 1);
    if (path.indexOf('/') !== 0) path = `/${path}`;
  }
  return path || '';
};


const useMenuItems = (topMenuOnly?: boolean): MenuItem[] => {
  return createMenuItems(routers[0].children, '', topMenuOnly);
};


const useChildMenuItems = (pathname: string): MenuItem[] | null => {
  pathname = processPath(pathname);

  let matchedRouter;
  for (const router of routers[0].children!) {
    const searchString = processPath(router.path);
    if (searchString === pathname || pathname.startsWith(`${searchString}/`)) {
      matchedRouter = router;
      break;
    }
  }

  return matchedRouter ?
    createMenuItems(matchedRouter.children, processPath(matchedRouter.path), false) : null;
};


const getFirstChildPathByParent = (pathname: string): string | null => {
  for (const router of routers[0].children!) {
    const searchString = processPath(router.path);
    if (searchString === pathname || pathname.startsWith(`${searchString}/`)) {
      if (router.children && router.children.length > 0) {
        return searchString + processPath(router.children[0].path);
      }
    }
  }

  return null;
};
const getBreadcrumbs = (t: Function, pathname: string): string[] => {
  const breadcrumbs: string[] = [];
  let tempRouters: MenuRouteObject[] = routers[0].children!;
  let matchedPath = '';
  while (tempRouters) {
    let isMatchedRouters = false;
    for (const router of tempRouters) {
      const routerPath = matchedPath + processPath(router.path);
      if (routerPath === pathname || pathname.startsWith(`${routerPath}/`)) {
        breadcrumbs.push(t(router.label || router.path!));
        matchedPath = routerPath;
        isMatchedRouters = true;
        tempRouters = router.children as MenuRouteObject[];
        break;
      }
    }
    if (!isMatchedRouters) {
      break;
    }
  }
  return breadcrumbs;
};

const router = createBrowserRouter(routers);
export { useMenuItems, useChildMenuItems, getBreadcrumbs, getFirstChildPathByParent, router };
