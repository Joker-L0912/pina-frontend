import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MyHeader from '../MyHeader';

const { Content } = Layout;


const Portal: React.FC = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();


  return (
    <Layout>
      <MyHeader />

      <Content style={{
        // padding: 24,
        margin: 0,
        minHeight: 'calc(100vh - 48px)',
        // background: colorBgContainer,
      }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};


export default Portal;
