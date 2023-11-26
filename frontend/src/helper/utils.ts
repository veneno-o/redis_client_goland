import { anyObj } from "../types/index.d";

// 连接多个className
export function classNames(...args: string[]) {
  return args.join(" ");
}

// 延时器
export async function Delay(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, time);
  });
}

// 根据类型返回相应的颜色
export const typeTagMap = new Map([
  ["string", "#f50"],
  ["hash", "#2db7f5"],
  ["set", "#87d068"],
  ["list", "#108ee9"],
]);
export function formatHashValue(hashValue: anyObj): any[] {
  // {a:1}=>[{field:'',value:''}]
  const res = [] as any[];
  Object.keys(hashValue).forEach((key) => {
    const obj = { field: key, value: hashValue[key] };
    res.push(obj);
  });
  return res;
}
