import { createStore, combineReducers } from "redux";
import { changeScreen } from "./actions";
import { UserReducer } from "./reducers";
const prestore = combineReducers({
  auth: UserReducer,
});
const store = createStore(prestore);
export default store;
