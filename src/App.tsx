import { ConfigProvider, App as AntdApp } from 'antd';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/sotre/store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#009688',
          colorInfo: '#009688',
          colorSuccess: '#22c55e',
          colorWarning: '#ed6c02',
          colorError: '#e53e3e',
          colorLink: '#00b8d9',
          colorPrimaryBg: '#e3f0e1',
        },
        components: {
          Layout: {
            headerBg: 'rgb(249,250,251)',
            algorithm: true,
          },
        },

        // components: {
        //   Layout: {
        //     headerBg: 'rgb(249,250,251)',
        //     algorithm: true,
        //   },
        // },
        // token: {
        //   colorPrimary: '#4caf50',
        //   colorInfo: '#4caf50',
        //   colorPrimaryBg: '#e3f0e1',
        // },

      }}
      >
        <AntdApp>
          <RouterProvider router={router} />
        </AntdApp>
      </ConfigProvider>
    </Provider>

  );
}

export default App;
