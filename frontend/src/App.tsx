import {
  Button,
  Collapse,
  CollapseProps,
  Form,
  Input,
  Layout,
  Modal,
  notification,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {
  ConnectCreate,
  ConnectDel,
  ConnectionEdit,
  ConnectionList,
} from "../wailsjs/go/main/App";
// import { define } from "../wailsjs/go/models";
import "./App.css";
interface connType {
  identity: string;
  name: string;
  addr: string;
  port: string;
  userName: string;
  password: string;
}
type FieldType = {
  name: string;
  addr: string;
  port: string;
  userName: string;
  password: string;
  identity: string;
};
const initForm = {
  name: "",
  addr: "",
  port: "",
  userName: "",
  password: "",
  identity: "",
};

function App() {
  const [connPool, setConnPool] = useState<connType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [form] = Form.useForm();
  const [sel, setSel] = useState<FieldType>();
  const [type, setType] = useState(0);
  /**
   * {
            name: "",
            addr: "",
            port: "",
            userName: "",
            password: "",
          }
   */

  const items: CollapseProps["items"] = connPool.map((item, i) => ({
    key: i,
    label: "连接名" + item.name,
    // header: (
    //   <div>
    //     <span>连接名: {item.name}</span>
    //     <Button>编辑</Button>
    //   </div>
    // ),
    extra: (
      <>
        <Button
          onClick={(e) => {
            editConn(e, item);
          }}
        >
          编辑
        </Button>
        <Button
          onClick={(e) => {
            delConn(e, item.identity);
          }}
        >
          删除
        </Button>
      </>
    ),
    children: <p>{JSON.stringify(item)}</p>,
    showArrow: false,
  }));
  useEffect(() => {
    getConnList();
  }, [refresh]);

  //   获取连接列表
  async function getConnList() {
    const { code, data } = await ConnectionList();
    if (code != 200) {
      return;
    }
    console.log("获取连接列表", data);
    setConnPool(data);
  }
  //   编辑连接
  async function editConn(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: connType
  ) {
    e.stopPropagation();
    setIsModalOpen(true);
    form.setFieldsValue({ ...item });
    setRefresh((r) => !r);
    setType(1);
  }
  // 删除连接
  async function delConn(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    identity: string
  ) {
    e.stopPropagation();
    const { msg } = await ConnectDel(identity);
    setRefresh((r) => !r);
    notification.success({
      message: msg,
    });
  }

  //   选择连接
  function selectAddr(i: number) {
    console.log("选择连接");
  }

  const contentStyle1: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9",
    height: "100vh",
  };
  const contentStyle2: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "rgb(16 115 233)",
    height: "100vh",
  };

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#3ba0e9",
    height: "100vh",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values: any) => {
    console.log("Success:校验通过", values);
    if (type == 0) {
      const { code, data, msg } = await ConnectCreate(values);
      console.log(code, data, msg);

      if (code != 200) {
        notification.error({
          message: msg,
        });
      } else {
        notification.success({
          message: msg,
        });
      }
    } else {
      const { code, data, msg } = await ConnectionEdit(values);

      if (code != 200) {
        notification.error({
          message: msg,
        });
      } else {
        notification.success({
          message: msg,
        });
      }
    }

    setIsModalOpen(false);
    setRefresh((r) => !r);
    form.resetFields(["name", "addr", "port", "userName", "password"]);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  // 改变折叠选项
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  function connHand() {
    setIsModalOpen(true);
    form.setFieldsValue(initForm);
    setType(0);
  }
  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={300}>
        <Button onClick={connHand}>建立连接</Button>
        <br />

        <Collapse items={items} onChange={onChange} />
      </Sider>
      <Content style={contentStyle1}></Content>
      <Content style={contentStyle2}>content2</Content>
      <Modal
        title={type == 0 ? "新建连接" : "编辑连接"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender
        footer={null}
      >
        <Form
          form={form}
          name="connection"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={initForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="ip地址"
            name="addr"
            rules={[{ required: true, message: "Please input your ip addr!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="identity" name="identity" hidden>
            <Input hidden />
          </Form.Item>

          <Form.Item<FieldType>
            label="连接名称"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="端口" name="port">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="用户名" name="userName">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default App;
