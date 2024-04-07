import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";

export default function Home() {
  const [form] = Form.useForm()

  const handleSearchFinish = (values) => {
    console.log(values)
  }

  const handleSearchReset = () => {
    form.resetFields()
  }

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
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

  const columns = [...COLUMNS,
    {
      title: "操作", key: "action", render: (_: any, row: any) => {
        return <>
          <Space>
            <Button type="link">编辑</Button>
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
    <Table dataSource={dataSource} columns={columns} scroll={{x: 1000}}/>;
  </>;
}
