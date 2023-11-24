import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Input,
  Layout,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchValues } from "../../../wailsjs/go/main/App";
import { classNames } from "../../helper/utils";
import { SearchKey } from "../../types";
import Cli from "./components/cli";
import Style from "./index.module.css";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export default function Details() {
  const { identity } = useParams();
  const { Option } = Select;
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "key",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const [showCli, setShowCli] = useState(false);
  useEffect(() => {
    const search = {
      conn_identity: identity || "",
      db: 0,
      keyword: "key",
      keyType: "string",
    } as SearchKey;
    console.log("search:", search);
    SearchValues(search).then((res) => {
      console.log("res:", res);
    });
  }, []);
  const selectBefore = (
    <Select defaultValue="string">
      <Option value="string">string</Option>
      <Option value="hash">hash</Option>
    </Select>
  );
  return (
    <Layout
      hasSider
      style={{
        height: "100vh",
      }}
    >
      <Sider
        width={60}
        style={{
          background: "rgb(15,22,51)",
        }}
      >
        <div className={Style.logo}></div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "rgb(15,22,51)",
            height: "48px",
          }}
        ></Header>
        <Content
          style={{
            background: "#000",
          }}
          className={Style.main}
        >
          {/* 50% */}
          <div className={Style.tableBox}>
            <div className="mt-[20px] flex justify-between">
              <Input
                size="large"
                addonBefore={selectBefore}
                addonAfter={
                  <div className=" cursor-pointer" onClick={() => {}}>
                    <SearchOutlined />
                    <span className="pl-[4px]">Search</span>
                  </div>
                }
                defaultValue="mysite"
              />
              <Button
                onClick={() => {
                  console.log("添加key");
                }}
                size="large"
                className="ml-[8px]"
              >
                +Key
              </Button>
            </div>
            <div className={Style.table}>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderRadiusLG: 0,
                    },
                  },
                }}
              >
                <Table columns={columns} dataSource={data} pagination={false} />
              </ConfigProvider>
            </div>
          </div>
          {/* 50% */}
          <div
            className={classNames(Style.cliBox, showCli ? Style.active : "")}
          >
            <Cli setShowCli={setShowCli}></Cli>
          </div>
          {/* 24px */}
          <div className={Style.botBar}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    borderRadiusSM: 0,
                    colorBgContainer: "red",
                  },
                },
              }}
            >
              <Button
                onClick={() => {
                  setShowCli((sc) => !sc);
                }}
                size="small"
                type="text"
                className="bg-[#1d1d1d]"
              >
                &gt;_ CLI
              </Button>
              <div className={Style.cliText}>We value your input.</div>
            </ConfigProvider>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
