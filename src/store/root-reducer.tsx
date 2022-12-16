import { combineReducers } from 'redux';

import CardReducer from './reducers/cartReducer/cartReducer';
import GlobalReducer from './reducers/globalReducer/globalReducer';

export default combineReducers({
  Card: CardReducer,
	Global: GlobalReducer
});