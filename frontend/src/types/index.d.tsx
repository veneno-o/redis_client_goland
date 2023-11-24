// export interface DataType {
//   databaseName: string;
//   hostPort: string;
//   identity: string;
//   address: string;
// }
export type FieldType = {
  name: string;
  addr: string;
  port: string;
  userName: string;
  password: string;
  identity: string;
};
// 0 展示连接列表 1 新建连接 2 编辑连接
export type ConnAreaState = 0 | 1 | 2;
// 连接列表类型
export interface ConnList {
  addr: string;
  identity: string;
  name: string;
  password: string;
  port: string;
  type: string;
  userName: string;
}
// 数据查询类型
export interface SearchKey {
  conn_identity: string;
  db: number;
  keyword: string;
  keyType: string;
}

export interface ICli {
  conn_identity: string;
  cli: any[];
}
// cli消息
export interface CliMsg {
  type: "success" | "error";
  text: string;
}

export interface TableDataType {
  key: string;
  ttl: string;
  type: string;
  value: any;
}

export interface SearchItem {
  type: string;
  key: string;
}

export interface DelKeyType {
  conn_identity: string;
  key: string;
}
export interface anyObj {
  [key: string]: string;
}
// 添加string
export interface AddType {
  type: string;
  conn_identity: string;
  key: string;
  value: string;
  ttl: number;
  hashValue: anyObj[];
}
// storeType
export interface StoreType {
  identity: string;
}
export interface PayloadType {
  type: "set_identity";
  data: anyObj;
}
