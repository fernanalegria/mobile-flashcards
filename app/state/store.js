import { createStore } from "redux";
import rootReducer from "./ducks";
import middleware from "./middleware";

export const createReduxStore = () => createStore(rootReducer, middleware);
