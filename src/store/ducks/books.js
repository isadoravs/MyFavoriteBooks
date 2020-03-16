// Action Types
import {REACT_APP_GOOGLE_API_KEY} from 'react-native-dotenv';

export const Types = {
  GET_PAGE: 'page/LOAD',
  GET_PAGE_SUCCESS: 'page/LOAD_SUCCESS',
  GET_PAGE_FAIL: 'page/LOAD_FAIL',
  ADD_FAVORITE: 'favorite/ADD',
  REMOVE_FAVORITE: 'favorite/REMOVE',
};

// Reducer

const initialState = {
  loading: false,
  books: [],
  error: undefined,
  totalItems: 0,
  favorites: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PAGE:
      return {...state, loading: true};
    case Types.GET_PAGE_SUCCESS:
      let newState;
      if (state.books) {
        newState = action.payload.data.items
          ? [...state.books, ...action.payload.data.items]
          : [...state.books];
      } else {
        newState = action.payload.data.items;
      }
      return {
        ...state,
        loading: false,
        books: newState,
        totalItems: action.payload.data.totalItems,
      };
    case Types.GET_PAGE_FAIL:
      return {...state, loading: false, error: action.error.message};
    case Types.ADD_FAVORITE:
      return {...state, favorites: [...state.favorites, action.payload.data]};
    case Types.REMOVE_FAVORITE:
      const fav = state.favorites.filter(data => data !== action.payload.data);
      return {...state, favorites: fav};
    default:
      return state;
  }
}

// Action Creators

export function getPage(value, index) {
  const ind = index ? index : 0;
  return {
    type: Types.GET_PAGE,
    payload: {
      request: {
        url: `/volumes?q=${value}&startIndex=${ind}&key=${REACT_APP_GOOGLE_API_KEY}`,
      },
    },
  };
}

export function addFavorite(item) {
  return {
    type: Types.ADD_FAVORITE,
    payload: {
      data: item,
    },
  };
}
export function removeFavorite(item) {
  return {
    type: Types.REMOVE_FAVORITE,
    payload: {
      data: item,
    },
  };
}
