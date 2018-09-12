import { ENV } from '../../constants';

export const SHOW_OBJECT_TOOLTIP = 'SHOW_OBJECT_TOOLTIP';
export const HIDE_OBJECT_TOOLTIP = 'HIDE_OBJECT_TOOLTIP';
export const SHOW_OBJECT_INFO = 'SHOW_OBJECT_INFO';
export const HIDE_OBJECT_INFO = 'HIDE_OBJECT_INFO';
export const SHOW_OBJECT_EDITOR = 'SHOW_OBJECT_EDITOR';
export const HIDE_OBJECT_EDITOR = 'HIDE_OBJECT_EDITOR';
export const SAVE_OBJECT_SUCCEED = 'SAVE_OBJECT_SUCCEED';
export const SAVE_OBJECT_FAILED = 'SAVE_OBJECT_FAILED';

export const showObjectTooltip = (coordinates, position) => async (dispatch, getState) => {
  const object = await _getObjectByCoordinates(coordinates);

  dispatch({
    type: SHOW_OBJECT_TOOLTIP,
    object,
    position
  });
};

export const hideObjectTooltip = (dispatch, getState) => {
  return {
    type: HIDE_OBJECT_TOOLTIP
  }
};

export const showObjectInfoByCoordinates = (coordinates, objectId) => async (dispatch, getState) => {
  const object = await _getObjectByCoordinates(coordinates);
  history.pushState(null, null, `${ENV.static}/objects/${object._id}`);

  return dispatch({
    type: SHOW_OBJECT_INFO,
    object: {
      _id: object._id
    }
  });
};

export const showObjectInfoById = (objectId) => async (dispatch, getState) => {
  dispatch({
    type: SHOW_OBJECT_INFO,
    object: {
      _id: objectId
    }
  });
};

export const hideObjectInfo = (dispatch, getState) => {
  history.pushState(null, null, ENV.static);
  return {
    type: HIDE_OBJECT_INFO
  }
};

export const showObjectEditorByCoordinates = (coordinates) => async (dispatch, getState) => {
  const object = await _getObjectByCoordinates(coordinates);

  dispatch({
    type: SHOW_OBJECT_EDITOR,
    object: {
      _id: object._id
    }
  });
};

export const showObjectEditorById = (objectId) => async (dispatch, getState) => {
  dispatch({
    type: SHOW_OBJECT_EDITOR,
    object: {
      _id: objectId
    }
  });
};

export const hideObjectEditor = (dispatch, getState) => {
  history.pushState(null, null, ENV.static);
  return {
    type: HIDE_OBJECT_EDITOR
  }
};

export const saveObject = (object) => async (dispatch, getState) => {
  try {
    let response = await fetch(`${ENV.api}/api/objects/object`, {
      method: 'PUT',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.token
      }
    });

    if (!response.ok) {
      return dispatch({ type: SAVE_OBJECT_FAILED });
    }

    dispatch({ type: SAVE_OBJECT_SUCCEED });
  } catch(e) {
    console.error(e);
    dispatch({ type: SAVE_OBJECT_FAILED });
  }
};

async function _getObjectByCoordinates(coordinates) {
  let response = await fetch(`${ENV.api}/api/objects?coordinates=${JSON.stringify(coordinates)}`, {
    headers: {
      'token': localStorage.token
    }
  });

  return await response.json();
}
