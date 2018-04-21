
import { combineReducers } from 'redux';
import { PURGE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_USER_PHONE, SIGN_OUT, SIGN_IN } from '../../constants/constants';

const phoneReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_USER_PHONE:
      return action.number;
    default:
      return state;
  }
};

const authTokenReducer = (state = '', action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.token;
    case SIGN_OUT:
      return '';
    default:
      return state;
  }
};

const cartLastUpdatedReducer = (state = 0, action) => {
  switch (action.type) {
    case PURGE_CART:
    case ADD_ITEM_TO_CART:
    case REMOVE_ITEM_FROM_CART: {
      return Date.now();
    }
    default: {
      return state;
    }
  }
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case PURGE_CART: {
      return {};
    }
    case ADD_ITEM_TO_CART: {
      const updatedItems = { ...state };
      // first check to see if item is already in cart, if so then add to its quantity
      if (action.id in updatedItems) {
        updatedItems[action.id] += action.quantity;
      } else {
        // if items isn't in cart, then add it
        updatedItems[action.id] = action.quantity;
      }
      return updatedItems;
    }
    case REMOVE_ITEM_FROM_CART: {
      const updatedItems = { ...state };
      // first check to see if item is already in cart, if so then subtract its quantity
      if (action.id in updatedItems) {
        if (updatedItems[action.id] <= action.quantity) {
          delete updatedItems[action.id]; // or remove completely
        } else {
          updatedItems[action.id] -= action.quantity;
        }
      }
      return updatedItems;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  cartLastUpdated: cartLastUpdatedReducer,
  cart: cartReducer,
  authToken: authTokenReducer,
  phone: phoneReducer,
});
