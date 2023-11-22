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
