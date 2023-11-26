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
import { formatHashValue } from "../../helper/utils";
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
    hashValue: [{ field: "", value: "" }],
    ttl: 0,
  } as AddType;
  const [formData, setFormData] = useState<AddType>(initStringForm);
  const disabBtn =
    formData.type == "string"
      ? !(Boolean(formData.key) && Boolean(formData.value))
      : !(Boolean(formData.key) && formData.hashValue.length > 0);
  const detailInfo = {
    ...state.detailInfo,
    ttl: state.detailInfo.ttl < 0 ? 0 : state.detailInfo.ttl,
    hashValue:
      state.detailInfo.type == "hash"
        ? formatHashValue(state.detailInfo.value)
        : [{ field: "", value: "" }],
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

  useEffect(() => {
    if (formData.hashValue.length == 0) {
      handAddField();
    }
  }, [formData.hashValue]);

  const valArea =
    formData.type == "string" ? (
      <Row className="mt-[20px]">
        <div className="mb-[8px]">Value:</div>
        <TextArea rows={4} value={formData.value} onChange={handValChange} />
      </Row>
    ) : (
      formData.hashValue.map((item, index) => {
        return (
          <Row className="mb-[20px]" key={index}>
            <Col span={10}>
              <Input
                value={item.field}
                onChange={(e) => {
                  handFixField(e, index, "field");
                }}
                placeholder="Please input field"
              />
            </Col>
            <Col span={10} offset={2}>
              <Input
                value={item.value}
                onChange={(e) => {
                  handFixField(e, index, "value");
                }}
                placeholder="Please input value"
              />
            </Col>
            <Col span={2}>
              <div className="mb-[10px]"></div>
              <div className="flex ">
                <DeleteOutlined
                  onClick={() => {
                    handDelField(index);
                  }}
                  className="mr-[8px] ml-[20px] cursor-pointer"
                />
                {type == "add" &&
                  index == Object.keys(formData.hashValue).length - 1 && (
                    <PlusCircleOutlined
                      onClick={handAddField}
                      className=" cursor-pointer"
                    />
                  )}
              </div>
            </Col>
          </Row>
        );
      })
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
          // const item = formData.hashValue;
          // Promise.all(UpdateHashItem(formData)).then((res) => {
          //   if (res.code == 200) {
          //     notification.success({
          //       message: res.msg,
          //     });
          //     navigate("/details");
          //   } else {
          //     notification.error({
          //       message: res.msg,
          //     });
          //   }
          // });
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
          // [{field:"",value:""}]=>{}
          const res = {};
          formData.hashValue.forEach((item) => {
            // @ts-ignore
            res[item.field] = item.value;
          });
          const props = {
            ...formData,
            value: res,
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
  function handDelField(index: number) {
    const newHashValue = formData.hashValue.filter((item, i) => i != index);
    setFormData((fd) => ({
      ...fd,
      hashValue: newHashValue,
    }));
  }
  function handAddField() {
    const newHashValue = [...formData.hashValue];
    newHashValue.push({ field: "", value: "" });
    setFormData((fd) => ({
      ...fd,
      hashValue: newHashValue,
    }));
  }

  function handFixField(e: any, index: number, type: "field" | "value") {
    const val = e.target.value;
    const fixObj = { ...formData.hashValue[index] };
    fixObj[type] = val;
    setFormData((fd) => ({
      ...fd,
      hashValue: formData.hashValue.map((item, i) =>
        i != index ? item : fixObj
      ),
    }));
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
                  disabled={type != "add"}
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
