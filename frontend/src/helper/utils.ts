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
