import {
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { MenuRouteObject } from 'src/router/menuRouteObject';
import Page3 from '../../pages/Page3';

const system: MenuRouteObject = {
  path: 'user',
  label: 'menu.user management',
  icon: <UserOutlined />,
  children: [
    {
      path: 'position',
      label: '岗位管理',
      icon: <UserSwitchOutlined />,
      element: <Page3 />,
    },
  ] as MenuRouteObject[],
};
export default system;
