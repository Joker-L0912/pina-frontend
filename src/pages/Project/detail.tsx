import { getProjectByKey, ProjectData, updateProject } from '@/apis/project/project';
import { getUserByName } from '@/apis/user/user';
import DebounceSelect from '@/components/DebounceSelect';
import { Button, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


interface UserValue {
  label: string;
  value: string;
}

function fetchUserList(username: string): Promise<UserValue[]> {
  // return fetch('https://randomuser.me/api/?results=5')
  //   .then((response) => response.json())
  //   .then((body) =>
  //     body.results.map(
  //       (user: { name: { first: string; last: string }; login: { username: string } }) => ({
  //         label: `${user.name.first} ${user.name.last}`,
  //         value: user.login.username,
  //       }),
  //     ));
  return getUserByName(username).then((res) =>
    res.data.map(
      (item) => ({
        label: item.username,
        value: item.username,
      }),
    ));
}


const ProjectDetail: React.FC = () => {
  const [form] = Form.useForm();
  const [project, setProject] = useState<ProjectData>();

  const params = useParams();
  const { key } = params;
  useEffect(() => {
    getProjectByKey(key || '').then((res) => {
      setProject(res.data);
    });
  }, [key]);

  useEffect(() => {
    if (project) {
      form.setFieldsValue(project);
    }
  }, [project, form]);

  const onFinish = (projectNew: ProjectData) => {
    if (!project) return;
    updateProject(project.id,
      { id: project.id,
        name: projectNew.name,
        leader: projectNew.leader,
        type: projectNew.type,
        description: projectNew.description }).then(() => {

    });
  };

  return (
    <>
      <Space style={{ display: 'flex', width: '60vw', margin: '20px auto' }} >
        <div style={{ fontSize: '24px', fontWeight: '500' }}>详细信息</div>
      </Space>

      <Form
        form={form}
        name="projectForm"
        size="large"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000, paddingLeft: '400px' }}
        onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<ProjectData>
          label="名称"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectData>
          label="关键字"
          name="keyword"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<ProjectData>
          label="类型"
          name="type"
        >
          <Input />
        </Form.Item>

        <Form.Item<ProjectData>
          label="项目负责人"
          name="leader"
        >
          <DebounceSelect
            placeholder="Select users"
            fetchOptions={fetchUserList}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item<ProjectData>
          label="描述"
          name="description"
        >
          <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </>
  );
};

export default ProjectDetail;
