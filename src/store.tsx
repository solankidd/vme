import { createStore } from "redux";
// import CartReducer from "./store/reducers/cartReducer";
import RootReducer  from "./store/root-reducer";

const Store = createStore(RootReducer);

export default Store;