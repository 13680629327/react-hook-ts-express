import React, { useEffect } from 'react';
import { RegisterWrapper, RegisterContainer } from './styled';
import { Form, Input, Button, message, InputNumber, Radio } from 'antd';
import { IUser } from '@/common/types/interface';
import { register } from '@/api/register';
import { useHistory } from 'react-router-dom';
import { useRequest } from 'ahooks';

const Login: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm<IUser>();

  // 设置 form 默认参数
  useEffect(() => {
    form.setFieldsValue({ sex: '男' });
  }, []);
  const { loading, run } = useRequest((formVal: IUser) => register(formVal), {
    manual: true,
    onSuccess: (res) => {
      message.success((res as any).message);
      setTimeout(() => {
        history.push('/login');
      }, 1000);
    }
  });
  const onFinish =  (formData: IUser) => {
    run(formData);
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
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: false, message: 'Please input your age!' }]}
          >
            <InputNumber min={1} max={200} />
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
            <Button type="primary" htmlType="submit" loading={loading}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </RegisterContainer>
    </RegisterWrapper>
  );
};

export default Login;
