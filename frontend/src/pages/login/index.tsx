import { Button, Form, Input, message } from "antd";
import classnames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';

import styles from "./index.module.css";
import { login } from "@/api";
import { Footer } from "antd/es/layout/layout";

export default function Login() {
  const router = useRouter();
  const handleFinish = async (values: { username: string; password: string }) => {
    try{
      var res = await login(values);
      console.log(res);
      if (res) {
        message.success("登录成功");

        localStorage.setItem("user", JSON.stringify(res))

        await router.push("/welcome");
      }
    }
    catch (err){
      message.error("账号密码错误");
    }

    // {data:{id:xx,name:xxx}}

  };

  return (
    <>
      <Head>
        <title>登录</title>
        <meta name="description" content="微博兴趣分析系统" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <header className={styles.header}>
          <Image
            className={styles.img}
            width={100}
            height={100}
            src="/logo.svg"
            alt="logo"
          />
          微博用户兴趣分析系统
        </header> */}
        <div className={styles.form}>
          <h1>
            Login
          </h1>
          <Form
            name="basic"
            initialValues={{ username: "", password: "" }}
            onFinish={handleFinish}
            //layout="vertical"
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input placeholder="Please enter username" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
              className="formItemInner"
            >
              <Input.Password placeholder="Please enter password" prefix={<LockOutlined />}/>
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                className={classnames(styles.btn, styles.loginBtn)}
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerIcon}>
          <a href="https://github.com/JulianChu-1/whut-final">
            <GithubOutlined />
          </a>
        </div>
        <div className={styles.footerText}>
          © Powered by JulianChu
        </div>
      </footer>
    </>
  );
}
