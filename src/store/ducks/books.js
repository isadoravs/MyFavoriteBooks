// Action Types
import {REACT_APP_GOOGLE_API_KEY} from 'react-native-dotenv';

export const Types = {
  GET_BOOKS: 'books/LOAD',
  GET_BOOKS_SUCCESS: 'books/LOAD_SUCCESS',
  GET_BOOKS_FAIL: 'books/LOAD_FAIL',
};

// Reducer

const initialState = {
  loading: false,
  books: [],
  error: [],
};

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case Types.GET_BOOKS:
      return {...state, loading: true};
    case Types.GET_BOOKS_SUCCESS:
      return {...state, loading: false, books: action.payload.data};
    case Types.GET_BOOKS_FAIL:
      return {...state, loading: false, error: action.payload.error};
    default:
      return state;
  }
}

// Action Creators

export function getBooks(value, index) {
  return {
    type: Types.GET_BOOKS,
    payload: {
      request: {
        url: `/volumes?q=${value}&startIndex=${index}&key=${REACT_APP_GOOGLE_API_KEY}`,
      },
    },
  };
}
