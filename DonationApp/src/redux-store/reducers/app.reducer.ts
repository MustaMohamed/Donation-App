import { Reducer } from 'redux';

const initialState = {};

export const appReducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case 'go':
      return {
        ...state,
        hi: 'hie',
      };
    default:
      return state;
  }
};