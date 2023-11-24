import { PayloadType, StoreType } from "../types/index.d";

function reducer(state: StoreType, payload: PayloadType) {
  switch (payload.type) {
    // 设置identity
    case "set_identity":
      const identity = payload.data.identity;
      localStorage.setItem("identity", JSON.stringify(identity));
      return {
        ...state,
        identity,
      };
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
