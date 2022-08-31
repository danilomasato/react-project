import * as api from "../api";
import * as types from "../constants/ActionTypes";

export const getBrand = () => dispatch => {
  return api.getBrand().then(response =>
    dispatch({
      type: types.RECEIVE_BRAND,
      brand: response.data
    })
  );
};

export const getModel = id => dispatch => {
  return api.getModel(id).then(response =>
    dispatch({
      type: types.RECEIVE_MODEL,
      model: response.data
    })
  );
};

export const getVersion = id => dispatch => {
  return api.getVersion(id).then(response =>
    dispatch({
      type: types.RECEIVE_VERSION,
      version: response.data
    })
  );
};

export const getVehicles = id => dispatch => {
  return api.getVehicles(id).then(response =>
    dispatch({
      type: types.RECEIVE_VEHICLES,
      vehicles: response.data
    })
  );
};