import { Card, Col, Row } from "antd";
import styles from "./index.module.css"
import { hotWeiboSpider } from "@/api";
import React, { useEffect, useState } from "react";
import { set } from "date-fns";
import dynamic from "next/dynamic";

export default function Home() {
  const [hotWeiboData, setHotWeiboData] = useState([]);

  const DynamicChart = dynamic(() => import('./chart_one'), {
    ssr: false // Tell Next.js not to render this on the server
  });

  const tabList = [
    {
      key: 'tab1',
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2',
    },
  ];
  
  const contentList: Record<string, React.ReactNode> = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };

  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  
  async function getHotData() {
    const data = await hotWeiboSpider();
    setHotWeiboData(data)
  }

  useEffect(() => {
    getHotData()
  }, [])
  

  return (
    <>
      <div className={styles.topCardContainer}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="欢迎使用" bordered={false}>
              Card Content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="基本信息" bordered={false}>
              {/* <Card.Grid style={{ width: '100%' }}>
                Content
              </Card.Grid>
              <Card.Grid style={{ width: '100%' }}>
                Content
              </Card.Grid>
              <Card.Grid style={{ width: '100%' }}>
                Content
              </Card.Grid> */}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="模型简介" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
      <div className={styles.bottomCardContainer}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card title="最近每日爬取量" bordered={false} 
                  tabList={tabList} activeTabKey={activeTabKey1} onTabChange={onTab1Change}>
              <DynamicChart />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="微博热搜话题" bordered={false}>
              <div className={styles.hotSearchList}>
                {hotWeiboData.map((topic, index) => (
                  <div key={index} className={styles.hotSearchItem}>
                    {index + 1}.  {topic}
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}