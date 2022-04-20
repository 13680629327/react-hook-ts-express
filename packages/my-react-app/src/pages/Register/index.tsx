import React, { useState } from 'react';
import { RegisterWrapper, RegisterContainer } from './styled';
import { Form, Input, Button, message, InputNumber, Radio, RadioChangeEvent } from 'antd';
import { IUser } from '@/common/types/interface';
import { register } from '@/api/register';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm<IUser>();
  const [userInfo, setUserInfo] = useState<IUser>({
    userName: '',
    password: '',
    confirm: '',
    sex: '男',
    age: '',
    mobile: '',
    mailbox: '',
  });
  const onAgeChange = (value: number) => {
    const params = { ...userInfo };
    params.age = value;
    setUserInfo(params);
  };
  const onSexChange = (e: RadioChangeEvent) => {
    const params = { ...userInfo };
    params.sex = e.target.value;
    setUserInfo(params);
  };

  const onFinish = async (form: IUser) => {
    try {
      const res: any = await register(form);
      message.success(res.message);
      setTimeout(() => {
        history.push('/login');
      }, 1000);
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <RegisterWrapper>
      <RegisterContainer>
        <h2>注册</h2>
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          initialValues={form}
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
          <Form.Item
            label="Confirm password"
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Sex"
            name="sex"
            rules={[{ required: true, message: 'Please select your sex!' }]}
          >
            <Radio.Group onChange={onSexChange} value={userInfo.sex}>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: false, message: 'Please input your age!' }]}
          >
            <InputNumber min={1} max={200} onChange={onAgeChange} />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: false, message: 'Please input your mobile!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mailbox"
            name="mailbox"
            rules={[
              { required: false, message: 'Please input your mailbox!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </RegisterContainer>
    </RegisterWrapper>
  );
};

export default Login;
