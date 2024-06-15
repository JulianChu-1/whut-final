import { Card, List, Typography } from "antd";



export default function Home() {
    const markedData = [
        {label: "PV", value: "176"},
        {label: "CV", value: "129"},
        {label: "Interactions", value: "675"},
        {label: "Share", value: "12"},
    ]

    return <>
    <Card title="Overview" style={{'width': '300px'}}>
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
    </Card>
    </>
}

