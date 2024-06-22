// reducers/userReducer.js
import { setUser, clearUser } from '../slice/userSlice';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUser.type:
      return {
        ...state,
        user: action.payload,
      };
    case clearUser.type:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
