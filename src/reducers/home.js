import {
  RECEIVE_BRAND,
  RECEIVE_MODEL,
  RECEIVE_VERSION,
  RECEIVE_VEHICLES,
} from "../constants/ActionTypes";

const home = (state = {
    brand: [],
    model: [],
    version: [],
    vehicles: []}, action) => {

    switch (action.type) {
        case RECEIVE_BRAND:
            return {...state, brand: action.brand};
        case RECEIVE_MODEL:
            return {...state, model: action.model};
        case RECEIVE_VERSION:
            return {...state, version: action.version};
        case RECEIVE_VEHICLES:
            return {...state, vehicles: action.vehicles};            
    default:
        return state;
  }
}

export default home;