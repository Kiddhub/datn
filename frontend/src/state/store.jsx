import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import tokenReducer from './tokenSlice'
const rootReducers = combineReducers({
  auth: authReducer,
  token: tokenReducer,
});
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
