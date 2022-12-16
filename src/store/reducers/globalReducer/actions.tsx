// import { UPDATE_COMMON_DATA } from './actionTypes';

const updateGlobalData = (globalData:any) => {
  return {
    type: 'UPDATE_COMMON_DATA',
		data: globalData
  };
};

export { updateGlobalData };