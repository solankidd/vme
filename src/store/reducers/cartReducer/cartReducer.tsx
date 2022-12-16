import { ADD_ITEM } from './actionTypes';

const initialState = {
  numOfItems: 0,
};

const CartReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems + 1,
      };
    default:
      return state;
  }
};

export default CartReducer;