import { Content } from "@/components";
import { Button, DatePicker, Form, Input, Select, Switch, message } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { weiboSpider } from "@/api";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [useDatepicker, setUseDatepicker] = useState(false);

  const handleChange = (checked: any) => {
    
    setUseDatepicker(checked);
  }

  const handleFinish = async (values: any) => {
    console.log(values);
    await weiboSpider(values);
    message.success("手动添加成功");
    router.push("/weibo")
  };

  return (
    <>
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
            name="weibo_user_id"
            rules={[
              {
                required: true,
                message: "请输入微博id",
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="爬取日期"
            name="since_date"
          >
            {useDatepicker ? (
              <DatePicker />
            ) : (
              <Input />
            )
          }
          </Form.Item>
          <Switch onChange={handleChange} />
          <Form.Item
            label="开始页"
            name="start_page"
            rules={[
              {
                required: true,
                message: "请输入作者",
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="cookie"
            name="cookie"
            rules={[
              {
                message: "请输入Cookie",
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item 
            label=" " 
            colon={false}
            rules={[
                {
                  required: true,
                  message: "请输入正文",
                },
            ]}
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