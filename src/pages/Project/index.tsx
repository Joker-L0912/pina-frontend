import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import {
  ColumnHeightOutlined, DownloadOutlined, FormatPainterOutlined,
  ReloadOutlined, SwapOutlined,
} from '@ant-design/icons';
import { getProject, ProjectData } from '@/apis/project/project';
import { useNavigate } from 'react-router-dom';

const Project: React.FC = () => {
  const [projectList, setProjectList] = useState<ProjectData[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setpageNumber] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState<string>('');
  const navigate = useNavigate();

  const columns: TableProps<ProjectData>['columns'] = [
    {
      title: '项目名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '关键字',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      key: 'leader',
    },
    {
      title: 'Action',
      key: 'action',
      width: '300px',
      render: (_, reacord: ProjectData) => (
        <Space size="middle">
          <Button onClick={() => { navigate(`/project/${reacord.keyword}/setting/detail`); }}>项目设置</Button>
          <Button>删除</Button>
          <Button>归档</Button>
        </Space>
      ),
    },
  ];

  const fetchProjectList = () => {
    setLoading(true);
    getProject({
      name: projectName,
      pageNum: pageNumber - 1,
      pageSize,
    }).then((res) => {
      setProjectList(res.data.content);
      setTotalElements(res.data.page.totalElements);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProjectList();
  }, [pageNumber, pageSize, projectName]);

  const handlePageChange = (pagination: TablePaginationConfig) => {
    setpageNumber(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  const handleNameInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
    setpageNumber(1);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px' }}>

        <Space align={'center'}>
          <span style={{ fontSize: '25px' }}>项目</span>
        </Space>

        <Space align={'center'} size={'middle'}>
          <Button
            type="primary"
            value={projectName}
            onClick={() => {

            }}
          >新增
          </Button>
        </Space>
      </Space>
      <Space style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px' }}>

        <Space align={'center'}>
          <Input
            placeholder="请输入项目名"
            onPressEnter={handleNameInputEnter}
          />
        </Space>

        <Space align={'center'} size={'middle'}>
          <ReloadOutlined />
          <DownloadOutlined />
          <ColumnHeightOutlined />
          <FormatPainterOutlined />
          <SwapOutlined />
        </Space>

      </Space>
      <Table
        columns={columns}
        dataSource={projectList}
        size="small"
        pagination={{ position: ['bottomLeft'], current: pageNumber, total: totalElements, showSizeChanger: false }}
        onChange={handlePageChange}
        loading={loading}
      />
    </div>

  );
};

export default Project;
