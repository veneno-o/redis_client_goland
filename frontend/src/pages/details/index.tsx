import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Input,
  Layout,
  Select,
  Table,
  Tag,
  notification,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchValues } from "../../../wailsjs/go/main/App";
import { classNames, typeTagMap } from "../../helper/utils";
import { SearchItem, SearchKey, TableDataType } from "../../types";
import Cli from "./components/cli";
import Style from "./index.module.css";

export default function Details() {
  const { identity } = useParams();
  const { Option } = Select;
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const columns: ColumnsType<TableDataType> = [
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (text, item) => (
        <Tag color={typeTagMap.get(text)} key={item.key + String(item.value)}>
          {text}
        </Tag>
      ),
    },
    {
      title: "key",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ttl",
      dataIndex: "ttl",
      key: "ttl",
      render: (text) => <span>{text == -1 ? "无限制" : text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button className="mr-[8px]">编辑</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </div>
      ),
    },
  ];
  const [showCli, setShowCli] = useState(false);
  // 搜索条件
  const [search, setSearch] = useState<SearchItem>({
    type: "",
    key: "",
  });
  useEffect(() => {
    handSearch();
  }, []);
  const selectBefore = (
    <Select value={search.type} onChange={handSelChange} className="w-[80px]">
      <Option value="">All</Option>
      <Option value="string">String</Option>
      <Option value="hash">Hash</Option>
    </Select>
  );
  // 条件搜索
  function handSearch() {
    const searchItem = {
      conn_identity: identity || "",
      db: 0,
      keyword: search.key,
      keyType: search.type,
    } as SearchKey;
    SearchValues(searchItem).then((res) => {
      if (res.code == 200) {
        setTableData(res.data);
        notification.success({
          message: res.msg,
        });
      } else {
        notification.error({
          message: res.msg,
        });
      }
    });
  }
  // 输入框文本改变
  function handChange(e: any) {
    const key = e.target.value;
    setSearch((s) => ({ ...s, key }));
  }
  // 选择框改变
  function handSelChange(type: string) {
    setSearch((s) => ({ ...s, type }));
  }
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
                value={search.key}
                onChange={handChange}
                size="large"
                addonBefore={selectBefore}
                addonAfter={
                  <div className=" cursor-pointer" onClick={handSearch}>
                    <SearchOutlined />
                    <span className="pl-[4px]">Search</span>
                  </div>
                }
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
                <Table
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                />
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
