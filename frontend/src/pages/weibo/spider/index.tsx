import { Content } from "@/components";
import { Button, DatePicker, Form, Input, Select, Switch, message, Modal, Spin } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { weiboSpider } from "@/api";
import { useState } from "react";
import { WeiboSpiderType } from "@/types";
import { set } from "date-fns";

export default function Home() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [responseData, setResponseData] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleFinish = async (values: WeiboSpiderType) => {
    console.log(values);
    setIsModalOpen(true);
    var response = await weiboSpider(values);
    if ( response == null) {
      response = 0
    }
    setResponseData(response); 
    setIsLoading(false);
  };

  const handleModalFinish = () => {
    setIsModalOpen(false);
    setIsLoading(true);
    router.push("/weibo")
    message.success(`共爬取${responseData}条微博`);
  }

  const modalTitle = isLoading === false ? "爬取成功！" : "爬取中..."
  const modalContent = isLoading === false ? `爬取成功! 共爬取${responseData}条数据` : "正在爬取中，请稍后..."

  return (
    <>
      <Modal 
        title = { modalTitle }
        open = { isModalOpen }
        closable = { false }
        footer = {[
          <Button 
            key="back" 
            onClick={ handleModalFinish }
            loading={ isLoading }
          >
            Return
          </Button>
        ]}
      >
        <p>
          { modalContent }
        </p>
      </Modal>
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