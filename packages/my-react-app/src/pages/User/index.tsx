import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Radio, message } from 'antd';
import { RequiredMark } from 'antd/lib/form/Form';
import { UserWrapper } from './styled';
import { IUser } from '@/common/types/interface';
import { UserStoreActionType } from '@/common/types/enum';
import { UserContext } from '@/store/user';
import { updateUserData } from '@/api/user';
import MyCard from '@/components/MyCard';

const User: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>(false);
  const { store, dispatch } = useContext(UserContext);
  const [form] = Form.useForm<IUser>();

  useEffect(() => {
    form.setFieldsValue({ ...store });
  }, [store]);
  // 取消修改
  const onCancelModify = () => {
    setRequiredMarkType(false);
    form.setFieldsValue({ ...store });
  };
  const onFinish = async (fromData: IUser) => {
    try {
      setLoading(true);
      const res: any = await updateUserData({ ...fromData, userId: store.userId });
      message.success(res.message);
      dispatch({
        type: UserStoreActionType.SetData,
        params: res.data,
      });
      setRequiredMarkType(false);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onSubmit = async () => {
    form.submit();
  };
  const more = (
    <div>
      {requiredMark ? (
        <div>
          <Button type="dashed" style={{ marginRight: '10px' }} onClick={onCancelModify}>
            取消
          </Button>
          <Button type="primary" onClick={onSubmit} loading={loading}>
            提交修改
          </Button>
        </div>
      ) : (
        <Button type="primary" onClick={() => setRequiredMarkType(true)}>
          修改个人信息
        </Button>
      )}
    </div>
  );

  return (
    <MyCard title="个人信息" headerRightSlot={more}>
      <UserWrapper>
        <Form
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 8 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={requiredMark}
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            {requiredMark ? <Input /> : store.userName}
          </Form.Item>
          <Form.Item
            label="Sex"
            name="sex"
            rules={[{ required: true, message: 'Please select your sex!' }]}
          >
            {requiredMark ? (
              <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            ) : (
              store.sex
            )}
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: false, message: 'Please input your age!' }]}
          >
            {requiredMark ? <InputNumber min={1} max={200} /> : store.age}
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: false, message: 'Please input your mobile!' }]}
          >
            {requiredMark ? <Input /> : store.mobile}
          </Form.Item>
          <Form.Item
            label="Mailbox"
            name="mailbox"
            rules={[
              { required: false, message: 'Please input your mailbox!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            {requiredMark ? <Input /> : store.mailbox}
          </Form.Item>
        </Form>
      </UserWrapper>
    </MyCard>
  );
};

export default User;
