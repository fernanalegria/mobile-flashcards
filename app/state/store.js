import { createStore } from "redux";
import rootReducer from "./ducks";
import middleware from "./middleware";

export const createStore = () => createStore(rootReducer, middleware);
