import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/authAction';
const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const error = useSelector(((state) => state.auth.error));

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatch(loginUser(values));
  };
  return (
    <Form style={{maxWidth: "400px"}}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </Form.Item>
      {error && <p>{error}</p>}
    </Form>
  );
};
export default LoginPage;