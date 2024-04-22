import { Card, Col, Row } from "antd";
import Page from "./chart_one";
import styles from "./index.module.css"

export default function Home() {
  return (
    <>
    <Row gutter={16}>
        <Col span={8}>
        <Card title="Card title" bordered={false}>
          <Page />
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
    </>
  );
}