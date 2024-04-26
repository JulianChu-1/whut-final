import { Card, Col, Row } from "antd";
import styles from "./index.module.css"
import { getMainInfo, hotWeiboSpider, spiderVolumeByDays, spiderVolumeByYear } from "@/api";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Counter from "./counter";
import { useRouter } from "next/router";


export default function Home() {
  const [hotWeiboData, setHotWeiboData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [Infodata, setInfoData] = useState({ weibo: 0, user: 0, poster: 0 });
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const router = useRouter()

  const DynamicChart = dynamic<{ data: { type: string; value: number }[] }>(() => import('./chart_one'), {
    ssr: false // Tell Next.js not to render this on the server
  });

  const onTab1Change = (key : any) => {
    setActiveTabKey1(key);
  };

  const cardTitle = activeTabKey1 === 'tab1' ? '最近14日爬取量' : '最近一年爬取量';

  const tabList = [
    {
      key: 'tab1',
      tab: '最近14日',
    },
    {
      key: 'tab2',
      tab: '最近一年',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (activeTabKey1 === 'tab1') {
        const fetchedData = await spiderVolumeByDays();
        setDatas(fetchedData);
      } else {
        const fetchedData = await spiderVolumeByYear();
        setDatas(fetchedData); // 更新状态，触发重新渲染
      }
    };

    fetchData();
  }, [activeTabKey1]);

  useEffect(() => {
    const fetchMainInfo = async () => {
      try {
        const response = await getMainInfo();
        setInfoData(response); // 假设返回的数据格式正是 { weibo: xx, user: xx, poster: xx }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchMainInfo();
  }, []);
  
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
              <div className={styles.hotSearchList}>
                {/* <div className={styles.hotSearchItem}>
                  1. 在分析微博用户兴趣前请先爬取其微博
                </div>
                <div className={styles.hotSearchItem}>
                  2. 
                </div> */}
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="基本信息" bordered={true} style={{}}>
              <Row gutter={[16, 16]}>
                <Col className={styles.cardColLabel}>
                  当前爬取微博总数
                </Col>
                <Col className={styles.cardColCount}>
                  <Counter counts={Infodata.weibo}/>
                </Col>
              </Row> 
              <Row gutter={[16, 16]}>
                <Col className={styles.cardColLabel}>
                  当前爬取微博博主总数
                </Col>
                <Col className={styles.cardColCount}>
                  <Counter counts={Infodata.poster}/>
                </Col>
              </Row> 
              <Row gutter={[16, 16]}>
                <Col className={styles.cardColLabel}>
                  当前用户总数
                </Col>
                <Col className={styles.cardColCount}>
                  <Counter counts={Infodata.user}/>
                </Col>
              </Row> 
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
            <Card title={cardTitle}
                  bordered={true} 
                  extra={<a href="#" className={styles.cardLink} onClick={handleWeiboSpider}>我也要爬</a>}
                  tabList={tabList} 
                  activeTabKey={activeTabKey1} 
                  onTabChange={onTab1Change}
            >
              <DynamicChart data={datas}/>
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