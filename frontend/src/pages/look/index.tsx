import { useStore } from "../../hooks/store";

export default function Look() {
  // @ts-ignore
  const { state } = useStore();
  const { detailInfo } = state;

  return <div>Look</div>;
}
