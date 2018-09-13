import {
  HIDE_OBJECT_INFO,
  GET_OBJECT_INFO_REQUEST,
  GET_OBJECT_INFO_SUCCESS,
  GET_OBJECT_INFO_FAILURE,
  UPDATE_OBJECT_INFO_REQUEST,
  UPDATE_OBJECT_INFO_SUCCESS,
  UPDATE_OBJECT_INFO_FAILURE } from '../actions/object';

const object = (state = {
  activeObject: {},
  fetchState: 'untouched',
  saveState: 'untouched',
  isVisible: false,
  isFetching: false,
  isUpdating: false
}, action) => {
  switch (action.type) {
    case GET_OBJECT_INFO_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_OBJECT_INFO_SUCCESS:
      return {
        ...state,
        activeObject: action.payload,
        fetchState: 'SUCCESS',
        isVisible: true,
        isFetching: false
      };

    case GET_OBJECT_INFO_FAILURE:
      return {
        ...state,
        fetchState: 'FAILURE',
        isFetching: false
      };

    case HIDE_OBJECT_INFO:
      return {
        ...state,
        isVisible: false
      };

    case UPDATE_OBJECT_INFO_REQUEST:
      return {
        ...state,
        isUpdating: true
      };

    case UPDATE_OBJECT_INFO_SUCCESS:
      return {
        ...state,
        saveState: 'SUCCESS',
        isUpdating: false
      };

    case UPDATE_OBJECT_INFO_FAILURE:
      return {
        ...state,
        saveState: 'FAILURE',
        isUpdating: false
      };

    default:
      return state;
  }
};

export default object;