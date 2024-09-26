import { MenuRouteObject } from 'src/router/menuRouteObject';
import Project from '@/pages/Project';
import ProjectSetting from '@/pages/Project/setting';
import ProjectDetail from '@/pages/Project/detail';
import ProjectMumber from '@/pages/Project/member';

const project: MenuRouteObject = {
  path: '/project',
  //   label: 'menu.user management',
  children: [
    {
      path: 'list',
      label: '项目列表',
      element: <Project />,
    },
    {
      path: ':key/setting',
      label: '项目设置',
      element: <ProjectSetting />,
      children: [
        {
          path: 'detail',
          label: '项目详情',
          element: <ProjectDetail />,
        },
        {
          path: 'member',
          label: '项目详情',
          element: <ProjectMumber />,
        },
      ],
    },
  ] as MenuRouteObject[],
};
export default project;
