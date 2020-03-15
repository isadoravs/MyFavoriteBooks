import {useSelector} from 'react-redux';
// Action Types
import {REACT_APP_GOOGLE_API_KEY} from 'react-native-dotenv';

export const Types = {
  GET_BOOKS: 'books/LOAD',
  GET_BOOKS_SUCCESS: 'books/LOAD_SUCCESS',
  GET_BOOKS_FAIL: 'books/LOAD_FAIL',
  GET_PAGE: 'page/LOAD',
  GET_PAGE_SUCCESS: 'page/LOAD_SUCCESS',
  GET_PAGE_FAIL: 'page/LOAD_FAIL',
};

// Reducer

const initialState = {
  loading: false,
  loadingPage: false,
  books: [],
  error: undefined,
  totalItems: 0,
};

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case Types.GET_BOOKS:
      return {...state, loading: true};
    case Types.GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.data.items,
        totalItems: action.payload.data.totalItems,
      };
    case Types.GET_BOOKS_FAIL:
      return {...state, loading: false, error: action.error.message};
    case Types.GET_PAGE:
      return {...state, loadingPage: true};
    case Types.GET_PAGE_SUCCESS:
      return {
        ...state,
        loadingPage: false,
        books: action.payload.data.items
          ? [...state.books, ...action.payload.data.items]
          : [...state.books],
        totalItems: action.payload.data.totalItems,
      };
    case Types.GET_PAGE_FAIL:
      return {...state, loadingPage: false, error: action.error.message};
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
  console.log(`Pagina ${index}`);
  return {
    type: Types.GET_PAGE,
    payload: {
      request: {
        url: `/volumes?q=${value}&startIndex=${index}&key=${REACT_APP_GOOGLE_API_KEY}`,
      },
    },
  };
}
