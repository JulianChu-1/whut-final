import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, TablePaginationConfig, Tooltip, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "./index.module.css"
import dayjs from "dayjs";
import { getWeiboList, weiboDelete } from "@/api/weibo";
import { WeiboQueryType, WeiboType } from "@/types";
import Content from "@/components/Content";

export default function Home() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [data,setData] = useState()
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })

  async function fetchData(values?: WeiboQueryType) {
    const list = await getWeiboList({ ...values, current: pagination.current, pageSize: pagination.pageSize})
    const {data} = list
    setData(data)
    // console.log(data)
    setPagination({...pagination, current: 1, total: data.length})
  }

  const handleSearchFinish = async (values: WeiboQueryType) => {
    const res = await getWeiboList({...values, current: 1, pageSize: pagination.pageSize})
    setData(res.data)
    setPagination({...pagination, current: 1, total: res.total})
  }

  const handleSearchReset = () => {
    form.resetFields()
  }

  const handleBookEdit = () => {
    router.push('/book/edit/id')
  }

  const handleWeiboDelete = async (id : string) => {
    await weiboDelete(id);
    message.success("删除成功");
    fetchData()
    form.resetFields()
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    // console.log(pagination)
    setPagination(pagination)
    const query = form.getFieldValue('search')

    getWeiboList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    })
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 155,
    },
    {
      title: '作者',
      dataIndex: 'screen_name',
      key: 'screen_name',
      ellipsis: true,
      width: 100,
    },
    {
      title: '原文',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
      width: 500,
      // render: (text: string) => (
      //   <Tooltip placement="topLeft" title={text}>
      //     {text}
      //   </Tooltip>
      // )
    },
    {
      title: '话题',
      dataIndex: 'topics',
      key: 'topics',
      ellipsis: true, //显示省略号
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 130,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
  ];

  useEffect(() => {
    fetchData()
    console.log(form.getFieldsValue)
  }, [])

  const columns = [...COLUMNS,
    {
      title: "操作", key: "action", render: (_: any, row: any) => {
        return <>
          <Space>
            <Button type="link" onClick={handleBookEdit}>编辑</Button>
            <Button type="link" danger 
              onClick={() => {
                handleWeiboDelete(row.id)
              }}>
              删除</Button>
          </Space>
        </>
      }
    }
  ]

  return (
    <Content
      title="微博列表"
      operation={
          <Button 
          type="primary"
          onClick={() =>{
            router.push("/weibo/add")
          }
          }
          >
            手动添加
          </Button>
      }
    >
      <Form
      name="search"
      form={form}
      onFinish={handleSearchFinish}
      initialValues={{
        screen_name: '',
        category: '',
        created_at: ''
      }}
      >
      <Row gutter={24}>
        <Col span={5}>
          <Form.Item name="screen_name" label="作者">
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
        <Col span={5}>
          <Form.Item name="created_at" label="创建时间">
            <DatePicker allowClear/>
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
        dataSource={data} 
        columns={columns} //数据和列
        scroll={{x: 1000}} //
        onChange={handleTableChange} // 分页改变或pageSize触发
        pagination={{ ...pagination, showTotal: () => `共 ${pagination.total} 条` }} //翻页
      />      
    </div>
    </Content>
  );
}
