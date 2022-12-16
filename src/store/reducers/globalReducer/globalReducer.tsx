// import { UPDATE_COMMON_DATA } from './actionTypes';

const initialState = {
  version: 0,
	cacheversion: 0,
	secret: 0
};

const GlobalReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'UPDATE_COMMON_DATA':
      return {
        ...state,
        version: action.data.version,
      };
    default:
      return state;
  }
};

export default GlobalReducer;