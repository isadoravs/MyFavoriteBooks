import 'react-native';
import {getPage, addFavorite, removeFavorite} from '~/store/ducks/books';
import reducer from '~/store/ducks/books';
import {Types} from '~/store/ducks/books';
import {REACT_APP_GOOGLE_API_KEY} from 'react-native-dotenv';
import configureMockStore from 'redux-mock-store';
import axiosMiddleware from 'redux-axios-middleware';
import api from '~/services/api';

let middlewares = [axiosMiddleware(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
const item = {
  title: 'Freud E O Teste de Realidade',
  authors: ['PATRICIA PORCHAT'],
  publisher: 'Casa do Psicólogo',
  publishedDate: '2005',
  description:
    "Na intrincada arquitetura do pensamento freudiano, alguns temas estiveram relegados ao limbo das questões pouco elaboradas ou de respostas aparentemente fáceis e óbvias. Tal foi o destino do 'teste de realidade', os processos envolvidos na separação entre",
  readingModes: {text: false, image: true},
  pageCount: 162,
  printType: 'BOOK',
  maturityRating: 'NOT_MATURE',
  allowAnonLogging: false,
  contentVersion: '0.0.1.0.preview.1',
};

/* ACTIONS TESTS */
describe('actions', () => {
  it('should create an action to add a favorite item', () => {
    const expectedAction = {
      type: Types.ADD_FAVORITE,
      payload: {
        data: item,
      },
    };
    expect(addFavorite(item)).toEqual(expectedAction);
  });

  it('should create an action to remove favorite item', () => {
    const expectedAction = {
      type: Types.REMOVE_FAVORITE,
      payload: {
        data: item,
      },
    };
    expect(removeFavorite(item)).toEqual(expectedAction);
  });

  it('should create an action to get page', () => {
    const index = 0;
    const busca = 'teste';
    const expectedAction = {
      type: Types.GET_PAGE,
      payload: {
        request: {
          url: `/volumes?q=${busca}&startIndex=${index}&key=${REACT_APP_GOOGLE_API_KEY}`,
        },
      },
    };
    expect(getPage(busca, index)).toEqual(expectedAction);
  });

  it('test if axios middleware successfully get a response from the api', () => {
    const index = 0;
    const busca = 'teste';
    const expectedAction = {type: Types.GET_PAGE + '_SUCCESS'};
    return store.dispatch(getPage(busca, index)).then(() => {
      expect(
        store.getActions().find(a => a.type === expectedAction.type),
      ).toBeDefined();
    });
  });
});

/* REDUCERS TESTS */
describe('books reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      books: [],
      error: undefined,
      totalItems: 1,
      favorites: [],
    });
  });

  it('should handle ADD_FAVORITE', () => {
    expect(
      reducer(
        {
          loading: false,
          books: [],
          error: undefined,
          totalItems: 1,
          favorites: [],
        },
        {
          type: Types.ADD_FAVORITE,
          payload: {
            data: item,
          },
        },
      ),
    ).toEqual({
      loading: false,
      books: [],
      error: undefined,
      totalItems: 1,
      favorites: [item],
    });
  });

  it('should handle REMOVE_FAVORITE', () => {
    expect(
      reducer(
        {
          loading: false,
          books: [],
          error: undefined,
          totalItems: 1,
          favorites: [item],
        },
        {
          type: Types.REMOVE_FAVORITE,
          payload: {
            data: item,
          },
        },
      ),
    ).toEqual({
      loading: false,
      books: [],
      error: undefined,
      totalItems: 1,
      favorites: [],
    });
  });

  it('should handle GET_PAGE', () => {
    const index = 0;
    const busca = 'teste';
    expect(
      reducer(
        {
          loading: false,
          books: [],
          error: undefined,
          totalItems: 1,
          favorites: [],
        },
        {
          type: Types.GET_PAGE,
          payload: {
            request: {
              url: `/volumes?q=${busca}&startIndex=${index}&key=${REACT_APP_GOOGLE_API_KEY}`,
            },
          },
        },
      ),
    ).toEqual({
      loading: true,
      books: [],
      error: undefined,
      totalItems: 1,
      favorites: [],
    });
  });
});
