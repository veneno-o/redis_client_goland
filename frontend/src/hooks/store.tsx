import { createContext, useContext, useReducer } from "react";
import { StoreType } from "../types/index.d";
import reducer from "./reduer";

const initState = {
  identity: "",
  detailInfo: {
    type: "",
    key: "",
    value: "",
    hashValue: [{}],
    ttl: 0,
  },
} as StoreType;

const context = createContext(initState);

export function StoreProvider(props: any) {
  const { children } = props;
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    // @ts-ignore
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
}

export function useStore() {
  return useContext(context);
}
