import { Card, Col, Row } from "antd";
import Page from "./chart_one";
import styles from "./index.module.css"
import { hotWeiboSpider } from "@/api";
import React, { useEffect, useState } from "react";
import { set } from "date-fns";

export default function Home() {
  const [hotWeiboData, setHotWeiboData] = useState([]);
  
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
            <Card title="Welcome" bordered={false}>
              Card Content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
      <div className={styles.bottomCardContainer}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card title="Card title" bordered={false}>
              Card content
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