import React, { useContext } from 'react';
import { LoginWrapper, LoginContainer } from './styled';
import { Form, Input, Button, message } from 'antd';
import { login } from '@/api/login';
import { UserContext } from '@/store/user';
import { useHistory } from 'react-router-dom';

interface ILogin {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const onFinish = async (form: ILogin) => {
    try {
      const res: any = await login(form);
      message.success(res.message);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      dispatch({
        type: 'updata',
        params: res.data,
      });
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    } catch (error) {
      //
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 注册
  const onRegister = () => {
    history.push('/register');
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <h2>登录</h2>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            userName: 'Fengchengzhi',
            password: '123456',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button type="link" onClick={onRegister}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;
