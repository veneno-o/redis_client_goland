import { PlusCircleOutlined } from "@ant-design/icons";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddString } from "../../../wailsjs/go/main/App";
import { AddType } from "../../types";
import Style from "./index.module.css";
const { Option } = Select;
const initStringForm = {
  conn_identity: "",
  type: "string",
  key: "",
  value: "",
  hashValue: [{}],
  ttl: 0,
} as AddType;
export default function AddEdit(props: any) {
  const {} = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AddType>(initStringForm);
  const disabBtn = !(Boolean(formData.key) && Boolean(formData.value));
  const valArea =
    formData.type == "string" ? (
      <Row className="mt-[20px]">
        <div className="mb-[8px]">Value:</div>
        <TextArea
          value={formData.value}
          onChange={handValChange}
          rows={4}
          placeholder="maxLength is 6"
          maxLength={6}
        />
      </Row>
    ) : (
      formData.hashValue.map((item) => {
        const keys = Object.keys(item);
        return (
          <Row className="mb-[20px]">
            <Col span={10}>
              <div className="mb-[8px]">Key Type*</div>
              <Input
                value={formData.ttl}
                onChange={handTTLChange}
                placeholder="No Limit"
              />
            </Col>
            <Col span={10} offset={2}>
              <div className="mb-[8px]">TTL</div>
              <Input
                value={formData.ttl}
                onChange={handTTLChange}
                placeholder="No Limit"
              />
            </Col>
            <Col span={2}>
              <div className="mb-[34px]"></div>
              <div className="flex justify-center">
                <PlusCircleOutlined className=" cursor-pointer" />
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
    switch (formData.type) {
      case "string":
        AddString(formData).then((res) => {
          if (res.code == 200) {
            notification.success({
              message: res.msg,
            });
            navigate("/look");
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
                  defaultValue={formData.type}
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
                Add Key
              </Button>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
