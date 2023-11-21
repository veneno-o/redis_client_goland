import { createContext, useContext, useReducer } from "react";
import reducer from "./reduer";
const initState = {};

const context = createContext(initState);

export function StoreProvider(props: any) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
}

export function useStore() {
  return useContext(context);
}
