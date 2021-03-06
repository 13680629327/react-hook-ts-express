import React, { useEffect, useState } from 'react';
import MyCard from '@/components/MyCard';
import { Button, message, Table, Modal } from 'antd';
import { getStaffList, delStaff } from '@/api/staff';
import AddOrEditStaff from './AddOrEditStaff';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';

export interface IStaff {
  id: React.Key;
  name: string;
  sex: number;
  phone?: string;
  perDiem: number;
  age?: number;
  project?: string;
}

const Staff: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IStaff[]>([]);

  // 获取员工列表
  const getStaffData = async () => {
    try {
      setLoading(true);
      const res = await getStaffList();
      setTableData(res.data);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffData();
  }, []);

  const [dialogVisible, setDialogVisible] = useState(false);
  const onAdd = () => {
    setDialogVisible(true);
  };
  const onClose = () => {
    setDialogVisible(false);
  };
  const onConfirm = () => {
    setDialogVisible(false);
    getStaffData();
  };
  // 编辑员工
  const [staffData, setStaffData] = useState<IStaff | null>(null);
  const onEdit = (record: IStaff) => {
    setStaffData(record);
    setDialogVisible(true);
  };
  useEffect(() => {
    if (!dialogVisible) {
      setStaffData(null);
    }
  }, [dialogVisible]);

  // 删除员工
  const [selectIds, setSelectIds] = useState<React.Key[]>([]);
  const onDel = async (ids: React.Key[]) => {
    if (!ids.length) {
      message.warning('请选择要删除的员工！');
      return;
    }
    Modal.confirm({
      title: ids.length > 1 ? '确定要删除选择的员工？' : '确定要删除该员工？',
      onOk: async () => {
        const res: any = await delStaff({ ids });
        message.success(res.message);
        getStaffData();
      },
      onCancel() {},
    });
  };

  // 批量删除
  const onBatchDel = () => {
    onDel(selectIds);
  };
  
  const columns: ColumnsType<IStaff> = [
    {
      title: '姓名',
      dataIndex: 'name',
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '日薪',
      dataIndex: 'perDiem',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '工作地点',
      dataIndex: 'project',
    },
    {
      title: '操作',
      width: 170,
      dataIndex: 'project',
      render: (_, record) => {
        return (
          <>
            <Button type="link" onClick={() => onEdit(record)}>
              编辑
            </Button>
            <Button type="link" onClick={() => onDel([record.id])}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const rowSelection: TableRowSelection<IStaff> = {
    onChange: (selectedRowKeys) => {
      setSelectIds(selectedRowKeys);
    },
    // getCheckboxProps: (record: DataType) => {
    //   return {
    //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     name: record.name,
    //   }
    // },
  };
  const handleXML = (
    <>
      <Button type="primary" style={{ marginRight: '10px' }} onClick={onAdd}>
        新增
      </Button>
      <Button onClick={onBatchDel}>
        删除
      </Button>
    </>
  );

  return (
    <>
      <MyCard title="员工信息" headerRightSlot={handleXML}>
        <Table
          loading={loading}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </MyCard>
      <AddOrEditStaff
        data={staffData}
        visible={dialogVisible}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default Staff;
