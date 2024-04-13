import { weiboAdd, weiboUpdate } from "@/api/weibo";
import { WeiboFormType, WeiboType } from "@/types";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Content from "../Content";
import styles from "./index.module.css";

const Option = Select.Option;
const { TextArea } = Input;

const WeiboForm: React.FC<WeiboFormType> = ({ title, editData }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [preview, setPreview] = useState();
  const [cover, setCover] = useState();

//   useEffect(() => {
//     if (editData) {
//       const data = {
//         ...editData,
//         category: editData.category
//           ? (editData.category as unknown as CategoryType)._id
//           : undefined,
//         publishAt: editData.publishAt ? dayjs(editData.publishAt) : undefined,
//       };
//       setCover(editData.cover);
//       form.setFieldsValue(data);
//     }
//   }, [editData, form]);

  const handleFinish = async (values: WeiboType) => {
    // if (values.created_at){
    //   values.created_at = dayjs(values.created_at).valueOf();
    // }
    console.log(values);
    await weiboAdd(values);
    message.success("手动添加成功");
    router.push("/weibo")
  };

  return (
    <>
      <Content title={title}>
        <Form
          name="weibo"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 18 }}
          className={styles.form}
          initialValues={editData ? editData : {}}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
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
            label="作者"
            name="screen_name"
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
            label="分类"
            name="category"
            rules={[
              {
                required: true,
                message: "请选择微博分类",
              },
            ]}
          >
            <Select
            options={[
                { value: "jack", label: "jack"},
                { value: "lucy", label: "lucy"},
                { value: "disabled", label: "disabled"},
            ]}>
            </Select>
          </Form.Item>
          <Form.Item
            label="话题"
            name="topics"
            rules={[
              {
                message: "请输入话题",
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="发表日期"
            name="created_at"
            className={styles.created_at}
            rules={[
                {
                  required: true,
                  message: "请输入话题",
                },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="正文" name="text">
            <TextArea className={styles.textarea} />
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
            >
              {editData?._id ? "更新" : "创建"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default WeiboForm;