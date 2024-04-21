import { Content } from "@/components";
import { Button, DatePicker, Form, Input, Select, Switch, Tooltip, message } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { weiboSpider } from "@/api";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { WeiboSpiderType } from "@/types";

export default function Home() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [useDatepicker, setUseDatepicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async (values: WeiboSpiderType) => {
    console.log(values);
    setIsLoading(true);
    var response = await weiboSpider(values);
    message.success(`共爬取${response}条微博`);
    router.push("/weibo")
  };

  return (
    <>
      {isLoading && <div>Loading... Please wait.</div>}
      <Content title="微博爬虫">
        <Form
          name="spider"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 18 }}
          className={styles.form}
          // initialValues={editData ? editData : {}}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="user_id_list"
            rules={[
              {
                required: true,
                message: "请输入微博用户的uid",
              },
            ]}
          >
            <Input placeholder="请输入微博用户的uid" />
          </Form.Item>
          <Form.Item
            label="爬取日期"
            name="since_date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="请输入爬取天数"/>
          </Form.Item>
          <Form.Item
            label="开始页"
            name="start_page"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="请输入爬取开始页, 默认从第一页开始爬"/>
          </Form.Item>
          <Form.Item
            label="cookie"
            name="cookie"
          >
            <Input placeholder="请输入您的cookie" />
          </Form.Item>
          <Form.Item 
            label=" " 
            colon={false}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.btn}
              //onClick={handleFinish}
            >
              Spider
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}