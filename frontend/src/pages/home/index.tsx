import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Table, Tag, notification } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ConnectCreate,
  ConnectDb,
  ConnectDel,
  ConnectionEdit,
  ConnectionList,
} from "../../../wailsjs/go/main/App";
import { ConnAreaState, ConnList, FieldType } from "../../types";
import Style from "./index.module.css";
const initForm = {
  name: "127.0.0.1",
  addr: "127.0.0.1",
  port: "6173",
  userName: "",
  password: "",
  identity: "",
};
export default function Home() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // 0 展示连接列表 1 新建连接 2 编辑连接
  const [area, setArea] = useState<ConnAreaState>(0);
  const [connList, setConnList] = useState<ConnList[]>([]);
  const columns: ColumnsType<ConnList> = [
    {
      title: "Database Alias",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_, item) => (
        <div
          onClick={() => {
            handGetConn(item.identity);
          }}
          className={Style.connDb}
        >
          {item.name}
        </div>
      ),
    },
    {
      title: "Host",
      dataIndex: "addr",
      key: "addr",
      width: 200,
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
      width: 200,
    },
    {
      title: "Identity",
      dataIndex: "identity",
      key: "identity",
      render: (_, item) => <Tag color="rgb(22 104 220)">{item.identity}</Tag>,
    },
    {
      title: "",
      dataIndex: "address",
      key: "address",
      width: 200,
      render: (_, item) => (
        <div style={{ whiteSpace: "nowrap" }}>
          <Button
            type="primary"
            onClick={() => {
              handEditConnItem(item);
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              handDelConnItem(item);
            }}
            type="primary"
            className="ml-[8px]"
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  // init
  useEffect(() => {
    handGetConnList();
  }, [area]);
  // 建立连接
  async function handGetConn(identity: string) {
    ConnectDb(identity).then((res) => {
      if (res.code == 200) {
        navigate("/" + identity);
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
  function handGetConnList() {
    ConnectionList().then((res) => {
      if (res.code == 200) {
        setConnList(res.data);
      }
    });
  }
  function handDelConnItem(item: ConnList) {
    ConnectDel(item.identity).then((res) => {
      if (res.code == 200) {
        notification.success({
          type: "success",
          message: res.msg,
          icon: <CheckOutlined />,
        });
      }
      handGetConnList();
    });
  }
  function handEditConnItem(item: ConnList) {
    setArea(2);
    form.setFieldsValue(item);
  }
  function onFinish(values: any) {
    if (area == 1) {
      // 新增连接
      ConnectCreate(values).then((res) => {
        if (res.code == 200) {
          notification.success({
            message: res.msg,
          });
        } else {
          notification.error({
            message: res.msg,
          });
        }
        setArea(0);
      });
    } else if (area == 2) {
      // 编辑连接
      ConnectionEdit(values).then((res) => {
        if (res.code == 200) {
          notification.success({
            message: res.msg,
          });
        } else {
          notification.error({
            message: res.msg,
          });
        }
        setArea(0);
      });
    }
  }
  const MainArea =
    area == 0 ? (
      <Table columns={columns} dataSource={connList} pagination={false} />
    ) : (
      <>
        <div className="text-[28px] pl-[230px] mb-[20px]">
          {area == 1 ? (
            <span>Add Connection</span>
          ) : (
            <span>Edit Connection</span>
          )}
        </div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={initForm}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Database Alias" name="name">
            <Input placeholder="127.0.0.1" />
          </Form.Item>

          <Form.Item<FieldType> label="Addr" name="addr">
            <Input placeholder="127.0.0.1" />
          </Form.Item>
          <Form.Item<FieldType> label="Port" name="port">
            <Input placeholder="6173" />
          </Form.Item>
          <Form.Item<FieldType> label="UserName" name="userName">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> hidden label="identity" name="identity">
            <Input.Password hidden />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </>
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
      <Content
        style={{
          background: "#000",
        }}
        className={Style.main}
      >
        <div className="text-[24px]">My Redis databases</div>
        <div className="my-[10px]">
          <Button
            type="primary"
            className="mr-[8px]"
            onClick={() => {
              setArea(1);
            }}
          >
            + ADD REDIS CONNECT
          </Button>
          {area > 0 && (
            <Button
              type="primary"
              onClick={() => {
                setArea(0);
              }}
            >
              * SELECT REDIS CONNECT
            </Button>
          )}
        </div>
        <div className={Style.table}>{MainArea}</div>
      </Content>
    </Layout>
  );
}
