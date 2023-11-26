import { useState } from "react";
import { SearchCli } from "../../../../../wailsjs/go/main/App";
import { classNames } from "../../../../helper/utils";
import { useStore } from "../../../../hooks/store";
import { CliMsg, ICli } from "../../../../types/index.d";
import Style from "./index.module.css";

export default function Cli(props: any) {
  const { setShowCli } = props;
  // @ts-ignore
  const { state } = useStore();
  const identity =
    state.identity || JSON.parse(localStorage.getItem("identity") || "");
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<CliMsg[]>([
    { text: "ping", type: "success" },
    { text: "pong", type: "info" },
  ]);

  function handClick(e: any) {
    // console.log("鼠标点击:", e);
  }
  // 键盘按下
  function handKeyDown(e: any) {
    if (e.keyCode == 13) {
      handSend(text);
    }
  }
  // 先后台发送消息
  function handSend(str: string) {
    if (str.trim() == "clear") {
      setMsg([]);
      setText("");
      return;
    }
    const cli = str.split(" ");
    const prop = { conn_identity: identity, cli } as ICli;

    SearchCli(prop).then((res) => {
      if (res.code == 200) {
        // 返回结果为数组
        if (Array.isArray(res.data)) {
          setMsg((m) => [
            ...m,
            { type: "success", text: "> " + text },
            ...res.data?.map((item: any, index: number) => ({
              type: "success",
              text: `${index}）"${item}"`,
            })),
          ]);
        } else {
          // 返回结果为字符串
          setMsg((m) => [
            ...m,
            { type: "success", text: "> " + text },
            { type: "success", text: `"${res.data}"` },
          ]);
        }
      } else {
        setMsg((m) => [
          ...m,
          { type: "success", text: "> " + text },
          { type: "error", text: `"${res.data}"` },
        ]);
      }
      setText("");
    });
  }
  // 文本改变
  function handChange(e: any) {
    const val = e.target.value;
    // 回车作为发送指令操作不计入文本
    if (val.includes("\n")) {
      return;
    }
    setText(val);
  }
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* 30px */}
      <div className={classNames("px-[8px]", Style.botBar)}>
        <div>&gt; _ CLI</div>
        <div className="flex text-[18px]">
          <div
            onClick={() => {
              setShowCli(false);
            }}
            className="cursor-pointer p-[4px]"
          >
            -
          </div>
          <div
            onClick={() => {
              handSend("clear");
              setShowCli(false);
            }}
            className="ml-[8px] cursor-pointer p-[4px]"
          >
            x
          </div>
        </div>
      </div>
      <div className={Style.content}>
        {msg.map((item, index) => (
          <div
            key={index}
            className={classNames(
              "p-[4px]",
              item.type == "error"
                ? " text-[red]"
                : item.type == "info"
                ? "text-[#c3ba15]"
                : ""
            )}
          >
            {item.text}
          </div>
        ))}
        {/* <input className={Style.emptyInput} /> */}
        <div className={classNames(Style.inputText)}>
          <textarea
            className={Style.emptyInput}
            onKeyDownCapture={handKeyDown}
            onClick={handClick}
            onChange={handChange}
            value={text}
          ></textarea>
          <span style={{ lineHeight: "24px", marginLeft: "4px" }}> &gt; </span>
        </div>
      </div>
    </div>
  );
}
