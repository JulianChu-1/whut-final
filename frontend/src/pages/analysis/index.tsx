import { Button, Col, Form, Input, Row, Space, Mentions, Card, List, Typography, message, Skeleton } from "antd";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { analysisWeibo } from "@/api";
import { Content } from "@/components";
import styles from "./index.module.css";
import { AnalysisPosterType, DemoPieProps, DemoWordCloudProps, MainInfoItemType } from "@/types";
// import DemoWordCloud from "./chart_word";
// import DemoPie from "./chart_pie";

export default function Home() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [data, setData] = useState({ main_data: [], pie_data: [], word_data: [] });
  const [markedData, setMarkedData] = useState<MainInfoItemType[]>([]);
  const [metaData, setMetaData] = useState<MainInfoItemType[]>([]);
  const [loading, setLoading] = useState(false);

  const PieChart = dynamic<DemoPieProps>(() => import('./chart_pie'), {
    ssr: false,  // Tell Next.js not to render this on the server
    loading: () => <Skeleton active/> 
  });

  const WordChart = dynamic<DemoWordCloudProps>(() => import('./chart_word'), {
    ssr: false,
    loading: () => <Skeleton active/>
  });

  // const main_data = [
  //   { label: "博主id", value: "123" },
  //   { label: "用户昵称", value: "陶喆" },
  //   { label: "微博数", value: '456' },
  //   { label: "用户描述", value: "Bonbon出生、新專輯籌備、巡迴唱會籌備，忙翻了！" },
  //   { label: "用户简介", value: "台湾音乐人，代表作《爱很简单》《黑色柳丁》《就是爱你》等" },
  // ]

  // const markedData = data_mainInfo.slice(0, 3);
  // const metaData = data_mainInfo.slice(3);

  const handleAnalysisFinish = async (value : AnalysisPosterType) => {
    setLoading(true);
    const datas = await analysisWeibo(value.user_id)
    if (!datas.main_data) {
      message.error("未找到该用户");
      return 0;
    }
    setData(datas)
    setMarkedData(datas.main_data.slice(0, 4));
    setMetaData(datas.main_data.slice(4));

    setTimeout (() => {
      setLoading(false);
    }, 1000)
  }

  useEffect(() => {
    const analysisUserId = localStorage.getItem("analysisUserId")
    if (analysisUserId) {
      form.setFieldsValue({ user_id: analysisUserId })
      handleAnalysisFinish({ user_id: analysisUserId })
      localStorage.removeItem("analysisUserId");
    }
    localStorage.removeItem("analysisUserId");
  }, [])

  return <>
    <Content
      title="博主兴趣总体分析"
      operation={
          <Button 
          type="primary"
          onClick={() =>{
            router.push("/analysis/trend")
            localStorage.setItem('analysisUserId', form.getFieldValue("user_id"));
          }
          }
          >
            查看趋势分析
          </Button>
      }
    >
    <Row gutter={[16,16]}>
      <Col span={7}>
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
        <Card title="基本信息" loading={loading}>
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
      <Col span={8.5}>
        <Card title = "微博类型占比" loading={loading} className={styles.loadingCard}>
          <PieChart data={data.pie_data}/>
        </Card>
      </Col>
      <Col span={8.5}>
        <Card title = "兴趣分析词云图" loading={loading} className={styles.loadingCard}>.
          <WordChart data={data.word_data} />
        </Card>
      </Col>
    </Row>
    </Content>
  </>;
}
