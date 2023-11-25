import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Input,
  Layout,
  Row,
  Select,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddHash, AddString, UpdateString } from "../../../wailsjs/go/main/App";
import { useStore } from "../../hooks/store";
import { AddType } from "../../types/index.d";
import Style from "./index.module.css";
const { Option } = Select;

export default function AddEdit() {
  // @ts-ignore
  const { state } = useStore();
  const identity =
    state.identity || JSON.parse(localStorage.getItem("identity") || "");
  const location = useLocation();
  const [type, setType] = useState("");

  const navigate = useNavigate();
  const initStringForm = {
    conn_identity: identity,
    type: "string",
    key: "",
    value: "",
    hashValue: { a: "1" },
    ttl: 0,
  } as AddType;
  const [formData, setFormData] = useState<AddType>(initStringForm);
  const disabBtn =
    formData.type == "string"
      ? !(Boolean(formData.key) && Boolean(formData.value))
      : !(Boolean(formData.key) && Object.keys(formData.hashValue).length > 0);
  const detailInfo = {
    ...state.detailInfo,
    ttl: state.detailInfo.ttl < 0 ? 0 : state.detailInfo.ttl,
    hashValue:
      state.detailInfo.type == "hash" ? state.detailInfo.value : [{ a: "1" }],
  };
  useEffect(() => {
    // 从location对象中获取查询参数
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    setType(type || "");
    if (type == "look") {
      setFormData((fd) => ({
        ...fd,
        ...detailInfo,
      }));
    }
  }, [location.search]);

  const valArea =
    formData.type == "string" ? (
      <Row className="mt-[20px]">
        <div className="mb-[8px]">Value:</div>
        <TextArea rows={4} value={formData.value} onChange={handValChange} />
      </Row>
    ) : (
      Object.keys(formData.hashValue).map((field, index) => {
        return (
          <Row className="mb-[20px]">
            <Col span={10}>
              <div className="mb-[8px]">Key Type*</div>
              <Input
                value={field}
                onChange={handTTLChange}
                placeholder="Please input field"
              />
            </Col>
            <Col span={10} offset={2}>
              <div className="mb-[8px]">TTL</div>
              <Input
                value={formData.hashValue[field]}
                onChange={handTTLChange}
                placeholder="Please input value"
              />
            </Col>
            <Col span={2}>
              <div className="mb-[34px]"></div>
              <div className="flex ">
                <DeleteOutlined className="mr-[8px] ml-[20px] cursor-pointer" />
                {index == Object.keys(formData.hashValue).length - 1 && (
                  <PlusCircleOutlined className=" cursor-pointer" />
                )}
              </div>
            </Col>
          </Row>
        );
      })
      // {formData.hashValue.map(item=>)}
    );
  function handleChange(type: string) {
    setFormData((fd) => ({ ...fd, type }));
    console.log("handleChange");
  }
  function handValChange(e: any) {
    const value = e.target.value;
    setFormData((fd) => ({ ...fd, value }));
  }
  function handTTLChange(e: any) {
    const ttl = e.target.value;
    setFormData((fd) => ({ ...fd, ttl }));
  }
  function handKeyChange(e: any) {
    const key = e.target.value;
    setFormData((fd) => ({ ...fd, key }));
  }
  function handAddKey(e: any) {
    if (type == "look") {
      // 编辑的逻辑
      switch (formData.type) {
        case "string":
          UpdateString(formData).then((res) => {
            if (res.code == 200) {
              notification.success({
                message: res.msg,
              });
              navigate("/details");
            } else {
              notification.error({
                message: res.msg,
              });
            }
          });
          break;
        case "hash":
          break;

        default:
          break;
      }
    } else if (type == "add") {
      // 添加的逻辑
      switch (formData.type) {
        case "string":
          AddString(formData).then((res) => {
            if (res.code == 200) {
              notification.success({
                message: res.msg,
              });
              navigate("/details");
            } else {
              notification.error({
                message: res.msg,
              });
            }
          });
          break;
        case "hash":
          const props = {
            ...formData,
            value: {
              ...formData.hashValue,
            },
          };
          AddHash(props).then((res) => {
            if (res.code == 200) {
              notification.success({
                message: res.msg,
              });
              navigate("/details");
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
          <div className={Style.addEdit}>
            <Row className="mb-[20px]">
              <Col span={10}>
                <div className="mb-[8px]">Key Type*</div>
                <Select
                  className="w-full"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <Option value="string">String</Option>
                  <Option value="hash">Hash</Option>
                </Select>
              </Col>
              <Col span={10} offset={4}>
                <div className="mb-[8px]">TTL</div>
                <Input
                  value={formData.ttl}
                  onChange={handTTLChange}
                  placeholder="No Limit"
                />
              </Col>
            </Row>
            <Row>
              <div className="mb-[8px]">Key Name*</div>
              <Input
                disabled={type != "add"}
                value={formData.key}
                onChange={handKeyChange}
                placeholder="maxLength is 6"
                maxLength={6}
              />
            </Row>
            <Divider />
            {valArea}
            <Row className="mt-[20px]">
              <Button
                onClick={() => {
                  navigate(-1);
                  console.log("cancel");
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={disabBtn}
                className="ml-[8px]"
                onClick={handAddKey}
              >
                {type == "look" ? "Edit Key" : "Add Key"}
              </Button>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
