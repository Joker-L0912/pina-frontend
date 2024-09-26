import React from 'react';
import { App as AntdApp, Button, Checkbox, Form, Input } from 'antd';
import styles from './login.module.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { loginApi, LoginRequestData } from '@/apis/user/user';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { modal } = AntdApp.useApp();

  const navigate = useNavigate();

  const showModal = () => {
    modal.success({
      title: '诶呀',
      content: '这个只是一个示例而已，需自己实现一下...',
    });
  };

  const handlSubmit = async (values: LoginRequestData) => {
    const res = await loginApi({ username: values.username, password: values.password });
    window.localStorage.setItem('token', res.data);
    navigate('/');
  };

  return (
    <div className={styles.container}>

      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: false }}
        onFinish={handlSubmit}
        style={{
          width: '400px',
          height: '400px',
          marginTop: '15%',
          background: '#fff',
          padding: 50,
          borderRadius: '6px',
        }}
      >

        <h1 style={{ marginBottom: '30px' }}>Pina</h1>

        <Form.Item
          name="username"
          rules={[{ required: true, message: '账户不能为空' }]}
          extra="测试账号 admin，密码 123456"
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账户" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Button
            type={'link'}
            className="login-form-forgot"
            style={{ float: 'right' }}
            onClick={showModal}
          >
            忘记密码
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            登 录
          </Button>
          或者 <Button type={'link'} onClick={showModal}>注册</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
