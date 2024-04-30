import { trendWeibo } from "@/api";
import { Content } from "@/components";
import { DemoAreaProps } from "@/types";
import { Button, Card, Col, Row } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [data, setData] = useState({ any_data: [], area_data: [] });

  const AreaChart = dynamic<DemoAreaProps>(() => import('./chart_area'), {
    ssr: false
  })

  async function fetchData(user_id: string) {
    const res = await trendWeibo(user_id)
    console.log(res)
    setData(res)
  }

  useEffect(() => {
    const analysisUserId = localStorage.getItem("analysisUserId")
    if (analysisUserId) {
      fetchData(analysisUserId)
    }
  }, [])

  return <>
    <Content
      title="博主兴趣趋势分析"
      operation={
          <Button 
          type="primary"
          onClick={() =>{
            router.push({
              pathname: '/analysis',
              query: { signal: false }, // 传递 user_id
            });
          }
          }
          >
            返回总体分析
          </Button>
      }
    >
    <Row gutter={[16, 16]} style={{marginTop: "20px"}}>
      <Col span={8}>
        <Card title="用户关键词趋势分析">
          
        </Card>
      </Col>
      <Col span={16}>
        <Card title="微博种类趋势分析">
          <AreaChart data={data.area_data}/>
        </Card>
      </Col>
    </Row>
    </Content>
  </>
}