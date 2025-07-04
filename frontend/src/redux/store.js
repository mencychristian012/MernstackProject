import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));