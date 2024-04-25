import { Card, Col, Row } from "antd";
import styles from "./index.module.css"
import { hotWeiboSpider } from "@/api";
import React, { useEffect, useState } from "react";
import { set } from "date-fns";
import dynamic from "next/dynamic";
import Counter from "./counter";
import { useRouter } from "next/router";

export default function Home() {
  const [hotWeiboData, setHotWeiboData] = useState([]);
  const router = useRouter()

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

  const handleWeiboSpider = () => {
    router.push("/weibo/spider")
  }
  

  return (
    <>
      <div className={styles.topCardContainer}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="欢迎使用" bordered={true} extra={<a href="#" className={styles.cardLink}>More</a>}>
              Card Content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="基本信息" bordered={true}>
              <Card.Grid style={{ width: '100%', fontSize: "20px" }}>
                <Row gutter={16}>
                  <Col style={{width: '50%', textAlign: 'center', fontSize: "15px"}}>
                    当前爬取微博总数
                  </Col>
                  <Col style={{width: '50%', textAlign: 'center', fontSize: "20px"}}>
                    <Counter counts={500}/>
                  </Col>
                </Row> 
              </Card.Grid>
              <Card.Grid style={{ width: '100%' }}>
                <Row gutter={16}>
                  <Col style={{width: '50%', textAlign: 'center', fontSize: "15px"}}>
                    当前用户总数
                  </Col>
                  <Col style={{width: '50%', textAlign: 'center', fontSize: "20px", fontStyle: "italic"}}>
                    <Counter counts={10}/>
                  </Col>
                </Row> 
              </Card.Grid>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="模型简介" bordered={true}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
      <div className={styles.bottomCardContainer}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card title="最近每日爬取量" 
                  bordered={true} 
                  extra={<a href="#" className={styles.cardLink} onClick={handleWeiboSpider}>我也要爬</a>}
                  tabList={tabList} 
                  activeTabKey={activeTabKey1} 
                  onTabChange={onTab1Change}
            >
              <DynamicChart />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="微博热搜话题" bordered={true}>
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