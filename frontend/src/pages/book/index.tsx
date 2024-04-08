import { Button, Col, Form, Input, Row, Select, Space, Table, TablePaginationConfig } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./index.module.css"

export default function Home() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [data,setData] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })

  const handleSearchFinish = (values: any) => {
    console.log(values)
  }

  const handleSearchReset = () => {
    form.resetFields()
  }

  const handleBookEdit = () => {
    router.push('/book/edit/id')
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination)
    setPagination(pagination as any)
  }

  // const dataSource = [
  //   {
  //     key: '1',
  //     name: '胡彦斌',
  //     age: 32,
  //     address: '西湖区湖底公园1号',
  //   },
  //   {
  //     key: '2',
  //     name: '胡彦祖',
  //     age: 42,
  //     address: '西湖区湖底公园1号',
  //   },
  // ];
  
  const COLUMNS = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await axios('http://127.0.0.1:8000')
      const data = res.data.data
      setData(data)
    }
    fetchData()
  }, [])

  const columns = [...COLUMNS,
    {
      title: "操作", key: "action", render: (_: any, row: any) => {
        return <>
          <Space>
            <Button type="link" onClick={handleBookEdit}>编辑</Button>
            <Button type="link" danger>删除</Button>
          </Space>
        </>
      }
    }
  ]

  return <>
      <Form
      name="search"
      form={form}
      onFinish={handleSearchFinish}
      initialValues={{
        name: '',
        authoe: '',
        category: ''
      }}
    >
      <Row gutter={24}>
        <Col span={5}>
          <Form.Item name="name" label="名称">
            <Input placeholder="请输入" allowClear/>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="author" label="作者">
            <Input placeholder="请输入" allowClear/>
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="category" label="分类">
            <Select
            allowClear
            showSearch
            placeholder="请选择"
            options={[
              { value: "jack", label: "jack"},
              { value: "lucy", label: "lucy"},
              { value: "disabled", label: "disabled"},
            ]}
            />
          </Form.Item>
        </Col>
        <Col span={9}>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button type="primary" onClick={handleSearchReset}>
              Clear
            </Button>
          </Space>
        </Form.Item>
        </Col>
      </Row>
    </Form>
    <div className={styles.tableWrap}>
      <Table 
        dataSource={data} columns={columns} //数据和列
        scroll={{x: 1000}} //
        onChange={handleTableChange} // 分页改变或pageSize触发
        pagination={{ ...pagination, showTotal: () => `共 ${pagination.total} 条` }} //翻页
      />;      
    </div>
  </>;
}
