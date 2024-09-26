import React, { useEffect, useState } from 'react';
import styles from '../Portal/portal.module.scss';
import { useNavigate } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { Avatar, Menu, MenuProps, Space } from 'antd';
// import { Navigate, useLocation } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { getUserInfoApi, UserInfoResponse } from '@/apis/user/user';

/** React
 * 头部
 * @constructor
 */
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: (<div>项目&nbsp;<DownOutlined style={{ fontSize: '12px' }} /></div>),
    key: 'project',
    children: [
      {
        label: '查看全部项目',
        key: '/list',
      },
    ],
  },
  {
    label: 'Navigation Two',
    key: 'app',
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
  },
];

const MyHeader: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('project');
  const [userInfo, setUserInfo] = useState<UserInfoResponse>({});
  const onClick: MenuProps['onClick'] = (e) => {
    const path = `/${e.keyPath[1]}${e.keyPath[0]}`;
    setCurrent(e.keyPath[e.keyPath.length - 1]);
    navigate(path);
  };

  useEffect(() => {
    getUserInfoApi().then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  return (
    <Header
      className={styles.header}
      style={{
        display: 'flex',
        textAlign: 'justify',
      }}
    >
      <div className={styles.logo} >
        Pina
      </div>

      <Space align={'center'} size={'middle'} style={{ display: 'flex', justifyContent: 'space-between' }} >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          style={{ backgroundColor: 'transparent', minWidth: '1000px' }}
          mode="horizontal"
          items={items}
        />
      </Space>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: 'auto 0 auto auto',
      }}
      >
        <Avatar size="default">{userInfo.username?.slice(0, 1)}</Avatar>
      </div>
    </Header>
  );
};


export default MyHeader;
