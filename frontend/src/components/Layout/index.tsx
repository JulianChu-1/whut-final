import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps, Space } from "antd";
import { Layout as AntdLayout, Breadcrumb, Dropdown, Menu } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

import styles from "./index.module.css";

const { Header, Content, Sider } = AntdLayout;

// const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps["items"] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

const ITEMS = [
  {
    // icon: React.createElement(icon),
    label: "微博管理",
    key: "weibo",
    children: [
      { label: "微博爬取", key: "/weibo/spider" },
      { label: "微博列表", key: "/weibo" },
      { label: "微博手动添加", key: "/weibo/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "博主兴趣分析",
    key: "/analysis",
  },
  {
    // icon: React.createElement(icon),
    label: "模型展示",
    key: "/model",
  },
  {
    // icon: React.createElement(icon),
    label: "账号管理",
    key: "user",

    children: [
      { label: "用户列表", key: "/user" },
      { label: "用户添加", key: "/user/add" },
    ],
  },
];

const USER_ITEMS: MenuProps["items"] = [
  {
    label: "用户中心",
    key: "1",
  },
  {
    label: "登出",
    key: "2",
  },
];

export function Layout({ children } : {children : ReactNode}) {
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };

  const activeMenu = router.pathname;

  return (
    <>
      <Head>
        <title>Weibo Show</title>
        <meta name="description" content="Designed by Julian" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AntdLayout>
          <Header className={styles.header}>
            <Image
              src="/logo.svg"
              width={30}
              height={30}
              alt="logo"
              className={styles.logo}
            />
            微博用户兴趣分析系统
            <span className={styles.user}>
              <Dropdown menu={{ items: USER_ITEMS }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    用户名
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </span>
          </Header>
          <AntdLayout className={styles.sectionInner}>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["/weibo"]}
                defaultOpenKeys={["weibo"]}
                selectedKeys={[activeMenu]}
                style={{ height: "100%", borderRight: 0 }}
                items={ITEMS}
                onClick={handleMenuClick}
              />
            </Sider>
            <AntdLayout className={styles.sectionContent}>
              <Content className={styles.content}>{children}</Content>
            </AntdLayout>
          </AntdLayout>
        </AntdLayout>
      </main>
    </>
  );
}
