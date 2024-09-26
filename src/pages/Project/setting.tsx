import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: 'setting',
    label: '项目设置',
    type: 'group',
    children: [
      { key: 'detail', label: '详细信息' },
      { key: 'digest', label: '摘要' },
      { key: 'member', label: '成员' },
    ],
  },
];

const ProjectSetting: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentKey = location.pathname.split('/').at(-1) || 'detail';

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const handleClick = ({ key }: {key: string}) => {
    navigate(key);
  };
  return (
    <>
      <Layout
        style={{ minHeight: 'calc(-48px + 100vh)' }}
      >
        <Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentKey]}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={handleClick}
          />
        </Sider>

        <Content >
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};

export default ProjectSetting;
