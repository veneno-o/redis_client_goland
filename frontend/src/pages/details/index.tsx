import {
  GithubOutlined,
  SearchOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Input,
  Layout,
  Popover,
  Select,
  Table,
  Tag,
  notification,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DelHash, DelString, SearchValues } from "../../../wailsjs/go/main/App";
import Wx from "../../assets/images/wx.jpg";
import { classNames, typeTagMap } from "../../helper/utils";
import { useStore } from "../../hooks/store";
import {
  DelKeyType,
  SearchItem,
  SearchKey,
  TableDataType,
} from "../../types/index.d";
import HeadCom from "../components/head";
import Cli from "./components/cli";
import Style from "./index.module.css";

export default function Details() {
  // @ts-ignore
  const { state, dispatch } = useStore();
  const identity =
    state.identity || JSON.parse(localStorage.getItem("identity") || "");

  const { Option } = Select;
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const navigate = useNavigate();
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
      render(value, record, index) {
        return (
          <div
            className={Style.connDb}
            onClick={() => {
              dispatch({
                type: "set_detailInfo",
                data: { detailInfo: record },
              });
              navigate("/crud?type=look");
            }}
          >
            {value}
          </div>
        );
      },
    },
    {
      title: "ttl",
      dataIndex: "ttl",
      key: "ttl",
      render: (text) => <span>{text == -1 ? "No limit" : text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, tableData, i) => (
        <div>
          <Button
            className="mr-[8px]"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/crud?type=look");
            }}
          >
            编辑
          </Button>
          <Button
            type="primary"
            danger
            onClick={(e) => {
              e.stopPropagation();
              handDelKey(tableData, i);
            }}
          >
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
  }, [identity]);
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
        // notification.success({
        //   message: res.msg,
        // });
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
  // 删除key
  function handDelKey(tableDataItem: TableDataType, i: number) {
    switch (tableDataItem.type) {
      case "string":
        DelString({
          conn_identity: identity,
          key: tableDataItem.key,
        } as DelKeyType).then((res) => {
          if (res.code == 200) {
            notification.success({
              message: res.msg,
            });
            const newTableData = tableData.filter((item, index) => index != i);
            setTableData(newTableData);
          } else {
            notification.error({
              message: res.msg,
            });
          }
        });
        break;
      case "hash":
        DelHash({
          conn_identity: identity,
          key: tableDataItem.key,
        } as DelKeyType).then((res) => {
          if (res.code == 200) {
            notification.success({
              message: res.msg,
            });
            const newTableData = tableData.filter((item, index) => index != i);
            setTableData(newTableData);
          } else {
            notification.error({
              message: res.msg,
            });
          }
        });
        break;
      default:
        break;
    }
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
        <Link to="/" className={Style.logo}></Link>
        <div className="py-[30px] h-[140px] flex flex-col justify-between">
          <Popover
            placement="right"
            content={
              <img className="w-[200px] h-[200px] text-[32px]" src={Wx}></img>
            }
          >
            <div className="flex justify-center">
              <WechatOutlined className="text-[32px]" />
            </div>
          </Popover>
          <Popover
            placement="right"
            content={<div>https://github.com/veneno-o</div>}
          >
            <div className="flex justify-center">
              <GithubOutlined className="text-[32px]" />
            </div>
          </Popover>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "rgb(15,22,51)",
            height: "48px",
          }}
        >
          <HeadCom></HeadCom>
        </Header>
        <Content
          style={{
            background: "#000",
          }}
          className={Style.main}
        >
          {/* 搜索 */}
          <div className="my-[20px] flex justify-between">
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
              onClick={(e) => {
                navigate("/crud?type=add");
              }}
              size="large"
              className="ml-[8px]"
            >
              +Key
            </Button>
          </div>
          {/* 50% */}
          <div className={Style.tableBox}>
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
                  // onRow={(record, index) => {
                  //   return {
                  //     onClick() {
                  //       dispatch({
                  //         type: "set_detailInfo",
                  //         data: { detailInfo: record },
                  //       });
                  //       navigate("/crud?type=look");
                  //     },
                  //   };
                  // }}
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
