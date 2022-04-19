import React, { useContext, useState } from 'react';
import { Form, Input, Button, InputNumber, Radio, RadioChangeEvent, message } from 'antd';
import { UserWrapper } from './styled';
import { IUser } from '@/common/types/interface';
import { UserContext } from '../../store/user';
import { RequiredMark } from 'antd/lib/form/Form';
import { updateUserData } from '@/api/user';

const User: React.FC = () => {
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>(false);
  const { store, dispatch } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState<IUser>(store);

  // 取消修改
  const onCancelModify = () => {
    setRequiredMarkType(false);
    setUserInfo(store);
  };
  const onChangeAge = (value: number) => {
    const params = { ...userInfo };
    params.age = value;
    setUserInfo(params);
  };
  const onChangeSex = (e: RadioChangeEvent) => {
    const params = { ...userInfo };
    params.sex = e.target.value;
    setUserInfo(params);
  };
  const onFinish = async (form: IUser) => {
    try {
      const res: any = await updateUserData({ ...form, userId: store.userId });
      message.success(res.message);
      dispatch({
        type: 'updata',
        params: res.data,
      });
      setRequiredMarkType(false);
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <UserWrapper>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 8 }}
        initialValues={userInfo}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={requiredMark}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          {requiredMark ? <Input /> : userInfo.userName}
        </Form.Item>
        <Form.Item
          label="Sex"
          name="sex"
          rules={[{ required: true, message: 'Please select your sex!' }]}
        >
          {requiredMark ? (
            <Radio.Group onChange={onChangeSex} value={userInfo.sex}>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          ) : (
            userInfo.sex
          )}
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: false, message: 'Please input your age!' }]}
        >
          {requiredMark ? <InputNumber min={1} max={200} onChange={onChangeAge} /> : userInfo.age}
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[{ required: false, message: 'Please input your mobile!' }]}
        >
          {requiredMark ? <Input /> : userInfo.mobile}
        </Form.Item>
        <Form.Item
          label="Mailbox"
          name="mailbox"
          rules={[
            { required: false, message: 'Please input your mailbox!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          {requiredMark ? <Input /> : userInfo.mailbox}
        </Form.Item>
        <Form.Item>
          {requiredMark ? (
            <div>
              <Button type="dashed" style={{ marginRight: '10px' }} onClick={onCancelModify}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交修改
              </Button>
            </div>
          ) : (
            <Button type="primary" onClick={() => setRequiredMarkType(true)}>
              修改个人信息
            </Button>
          )}
        </Form.Item>
      </Form>
    </UserWrapper>
  );
};

export default User;
