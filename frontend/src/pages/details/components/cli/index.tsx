import { useState } from "react";
import { classNames } from "../../../../helper/utils";
import Style from "./index.module.css";
export default function Cli() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<string[]>(["123", "321"]);
  function handClick(e: any) {
    console.log("鼠标点击:", e);
  }
  // 键盘按下
  function handKeyDown(e: any) {
    if (e.keyCode == 13 && text.trim() == "clear") {
      setMsg([]);
      setText("");
    }
  }
  // 先后台发送消息
  function handSend() {}
  // 文本改变
  function handChange(e: any) {
    const val = e.target.value;
    // 回车作为发送指令操作不计入文本
    if (val.includes("\n")) return;
    setText(val);
  }
  return (
    <div className="w-full h-full overflow-hidden">
      {msg.map((item, index) => (
        <div key={index}>{item}</div>
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
        <span style={{ lineHeight: "20px" }}> &gt; </span>
      </div>
    </div>
  );
}
