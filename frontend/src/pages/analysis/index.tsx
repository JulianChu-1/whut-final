import { Content } from "@/components";
import styles from "./index.module.css"
import { Button, Col, Form, Input, Row, Space } from "antd";
import { analysisWeibo } from "@/api";

export default function Home() {
  const [form] = Form.useForm()

  const handleAnalysisFinish = async (value : any) => {
    const datas = await analysisWeibo(value.user_id)
    console.log(datas)
  }

  return <>
    <Content title="博主分析"></Content>
    <Form
      name="analysis"
      form={form}
      onFinish={handleAnalysisFinish}
      initialValues={{
        user_id: '',
      }}
      >
      <Row gutter={24}>
        <Col span={5}>
          <Form.Item name="user_id" label="作者">
            <Input placeholder="请输入" allowClear/>
          </Form.Item>
        </Col>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
    <div>

    </div>
  </>;
}
