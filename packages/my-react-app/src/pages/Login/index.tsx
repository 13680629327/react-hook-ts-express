import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginWrapper, LoginContainer } from './styled';
import { Form, Input, Button, message } from 'antd';
import { login } from '@/api/login';
import { UserContext } from '@/store/user';
import { UserStoreActionType } from '@/common/types/enum';
import { useRequest } from 'ahooks';
import { useForm } from 'antd/lib/form/Form';

interface ILogin {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const [form] = useForm<ILogin>();

  useEffect(() => {
    // 设置默认参数
    form.setFieldsValue({ userName: 'Fengchengzhi', password: '123456' });
  }, []);

  const { loading, run } = useRequest((formVal: ILogin) => login(formVal), {
    manual: true,
    onSuccess: (res) => {
      message.success((res as any).message);
      dispatch({
        type: UserStoreActionType.SetData,
        params: res.data,
      });
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    }
  });

  const onFinish = (formData: ILogin) => {
    run(formData);
  };

  const onFinishFailed = () => {
    // throw new Error('请填写完整信息！');
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
          form={form}
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
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
            >
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
