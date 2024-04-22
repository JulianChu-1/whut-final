import { setLogout } from "@/api";
import { USER_ROLE } from "@/constants";
import { useCurrentUser } from "@/utils/hoos";
import { DownOutlined } from "@ant-design/icons";
import {
  ProfileOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout as AntdLayout,
  Dropdown,
  Menu,
  MenuProps,
  Space,
  message,
} from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";
import React, { PropsWithChildren, ReactElement, ReactNode, useMemo } from "react";

import styles from "./index.module.css";

const { Header, Sider, Content } = AntdLayout;

// const Layout: React.FC<
//   PropsWithChildren & { title?: string; operation?: ReactElement }
// > = ({ children, title = "图书列表", operation }) => {
//   const router = useRouter();
//   const user = useCurrentUser();

//   const activeMenu = router.pathname;
//   const defaultOpenKeys = [activeMenu.split("/")[1]];

//   const handleChangeMenu: MenuProps["onClick"] = (e) => {
//     router.push(e.key);
//   };

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
    key: "1",
    label: <Link href={`/user`}>个人中心</Link>,
  },
  {
    key: "2",
    label: (
      <span
        onClick={async () => {
          await setLogout();
          localStorage.removeItem("user");
          message.success("退出成功");
          router.push("/login");
        }}
      >
        退出
      </span>
    ),
  },
];

export function Layout({ children } : {children : ReactNode}) {
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };

  let user = null
  if (typeof window !== 'undefined') {
    const userStorage = localStorage?.getItem('user')
    if (userStorage) {
      user = JSON.parse(userStorage)
    }
  }

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
            {/* <Image
              src="/logo.svg"
              width={30}
              height={30}
              alt="logo"
              className={styles.logo}
            /> */}
            微博用户兴趣分析系统
            <span className={styles.user}>
              <Dropdown menu={{ items: USER_ITEMS }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {user?.nickname ? user.nickname : '用户名'}
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
