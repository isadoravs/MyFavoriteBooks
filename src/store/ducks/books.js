// Action Types
import {REACT_APP_GOOGLE_API_KEY} from 'react-native-dotenv';

export const Types = {
  GET_BOOKS: 'books/LOAD',
  GET_BOOKS_SUCCESS: 'books/LOAD_SUCCESS',
  GET_BOOKS_FAIL: 'books/LOAD_FAIL',
  GET_PAGE: 'page/LOAD',
  GET_PAGE_SUCCESS: 'page/LOAD_SUCCESS',
  GET_PAGE_FAIL: 'page/LOAD_FAIL',
  ADD_FAVORITE: 'favorite/ADD',
  REMOVE_FAVORITE: 'favorite/REMOVE',
  RESTART_SEARCH: 'search/restart',
};

// Reducer

const initialState = {
  loading: false,
  books: [],
  error: undefined,
  totalItems: 1,
  favorites: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_BOOKS:
      return {...state, loading: true};
    case Types.GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.data.items,
        totalItems: action.payload.data.totalItems,
        error: undefined,
      };
    case Types.GET_BOOKS_FAIL:
      return {...state, loading: false, error: action.error.message};
    case Types.GET_PAGE:
      return {...state, loading: true};
    case Types.GET_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.data.items
          ? [...state.books, ...action.payload.data.items]
          : [...state.books],
        totalItems: action.payload.data.totalItems,
        error: undefined,
      };
    case Types.GET_PAGE_FAIL:
      return {...state, loading: false, error: action.error.message};
    case Types.ADD_FAVORITE:
      return {...state, favorites: [...state.favorites, action.payload.data]};
    default:
      return state;
  }
}

// Action Creators
export function getBooks(value) {
  return {
    type: Types.GET_BOOKS,
    payload: {
      request: {
        url: `/volumes?q=${value}&startIndex=0&key=${REACT_APP_GOOGLE_API_KEY}`,
      },
    },
  };
}

export function getPage(value, index) {
  return {
    type: Types.GET_PAGE,
    payload: {
      request: {
        url: `/volumes?q=${value}&startIndex=${index}&key=${REACT_APP_GOOGLE_API_KEY}`,
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
export function restartSearch() {
  return {
    type: Types.RESTART_SEARCH,
  };
}
