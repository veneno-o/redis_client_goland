import { Button, Checkbox, Form, Input, Layout, Table } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { DataType, FieldType } from "../../types";
import Style from "./index.module.css";

export default function Home() {
  // 0 展示连接列表 1 新建连接 2 编辑连接
  const [area, setArea] = useState(0);
  const [form] = Form.useForm();
  const columns: ColumnsType<DataType> = [
    {
      title: "Database Name",
      dataIndex: "databaseName",
      key: "databaseName",
      width: 200,
    },
    {
      title: "Host:Port",
      dataIndex: "hostPort",
      key: "hostPort",
      width: 200,
    },
    {
      title: "Identity",
      dataIndex: "identity",
      key: "identity",
    },
    {
      title: "",
      dataIndex: "address",
      key: "address",
      width: 200,
      render: (_, item) => (
        <>
          <Button type="primary">编辑</Button>
          <Button type="primary" className="ml-[8px]">
            删除
          </Button>
        </>
      ),
    },
  ];
  const data: DataType[] = [
    {
      databaseName: "1",
      hostPort: "John Brown",
      identity: "dfs",
      address: "New York No. 1 Lake Park",
    },
  ];
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const MainArea =
    area == 0 ? (
      <Table columns={columns} dataSource={data} />
    ) : (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
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
