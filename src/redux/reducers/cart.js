const constants = {
  ADD_PIZZA_CART: 'ADD_PIZZA_CART',
  CLEAR_CART: 'CLEAR_CART',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  PLUS_CART_ITEM: 'PLUS_CART_ITEM',
  MINUS_CART_ITEM: 'MINUS_CART_ITEM',
};

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const totalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_PIZZA_CART: {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = totalSum(newItems, 'items.length');
      const totalPrice = totalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case constants.REMOVE_CART_ITEM: {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case constants.CLEAR_CART: {
      return { items: {}, totalPrice: 0, totalCount: 0 };
    }

    case constants.PLUS_CART_ITEM: {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const totalCount = totalSum(newItems, 'items.length');
      const totalPrice = totalSum(newItems, 'totalPrice');
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case constants.MINUS_CART_ITEM: {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const totalCount = totalSum(newItems, 'items.length');
      const totalPrice = totalSum(newItems, 'totalPrice');
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

export default cart;
