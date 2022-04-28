import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Radio, message } from 'antd';
import { editStaff, addStaff } from '@/api/staff';

interface IAddOrEditStaffProps {
  // title?: React.ReactNode;
  visible: boolean;
  data?: any;
  onClose: () => void;
  onConfirm: () => void;
}
interface IStaff {
  name: string;
  sex: number;
  perDiem: number;
  phone?: string;
  age?: number;
  project?: string;
  id?: string;
}
const AddOrEditStaff: React.FC<IAddOrEditStaffProps> = (props) => {
  const [form] = Form.useForm<IStaff>();
  const { visible, data, onClose, onConfirm } = props;

  useEffect(() => {
    if (data && data.id) {
      form.setFieldsValue({ ...data });
    }
  }, [data]);

  const [isConfirm, setIsconfirm] = useState<boolean>(false);
  const onOk = () => {
    form.submit();
  };
  const onFinish = async (formData: IStaff) => {
    try {
      setIsconfirm(true);
      const res: any =
        data && data.id ? await editStaff({ id: data.id, ...formData }) : await addStaff(formData);
      message.success(res.message);
      onConfirm();
    } catch (error) {
      //
    } finally {
      setIsconfirm(false);
    }
  };
  return (
    <Modal
      destroyOnClose
      title={data && data.id ? '编辑员工' : '新增员工'}
      visible={visible}
      onOk={onOk}
      onCancel={onClose}
      confirmLoading={isConfirm}
      transitionName=""
      maskTransitionName=""
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={onFinish}
        preserve={false}
        autoComplete="off"
      >
        <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="sex" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="日薪" name="perDiem" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="电话" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber min={1} max={200} />
        </Form.Item>
        <Form.Item label="工作地点" name="project">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddOrEditStaff;
