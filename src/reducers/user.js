import { GET_USER } from '../actions/user.js';

const user = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default user;