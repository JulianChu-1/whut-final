import { Button, Col, Form, Input, Row, Space, Mentions, Card, List, Typography } from "antd";
import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { analysisWeibo } from "@/api";
import { Content } from "@/components";
import styles from "./index.module.css"
const { Text } = Typography;

export default function Home() {
  const [form] = Form.useForm()

  const data = [
    { label: "博主id", value: "123" },
    { label: "用户昵称", value: "陶喆" },
    { label: "微博数", value: 485 },
    { label: "用户描述", value: "Bonbon出生、新專輯籌備、巡迴唱會籌備，忙翻了！" },
    { label: "用户简介", value: "台湾音乐人，代表作《爱很简单》《黑色柳丁》《就是爱你》等" },
  ]
  const markedData = data.slice(0, 3);
  const metaData = data.slice(3);

  const handleAnalysisFinish = async (value : any) => {
    const datas = await analysisWeibo(value.user_id)
    console.log(datas)
  }

  return <>
    <Content title="博主分析">
    <Row>
      <Col>
        <Form
          name="analysis"
          form={form}
          onFinish={handleAnalysisFinish}
          initialValues={{
            user_id: '',
          }}
          >
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item name="user_id" label="博主id" rules={[{required: true,}]}>
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Analysis
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Card title="基本信息">
          <List
            itemLayout="horizontal"
            dataSource={markedData}
            renderItem={(item) => (
              <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography.Text>
                  <strong>{item.label}</strong>
                </Typography.Text> 
                  {item.value}
              </List.Item>
            )}
          />
          <List
            itemLayout="horizontal"
            dataSource={metaData}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<strong>{item.label}</strong>}
                  description={item.value}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col>

      </Col>
    </Row>
    </Content>
  </>;
}
