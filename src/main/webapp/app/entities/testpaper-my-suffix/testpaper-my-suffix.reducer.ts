import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITestpaperMySuffix, defaultValue } from 'app/shared/model/testpaper-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_TESTPAPER_LIST: 'testpaper/FETCH_TESTPAPER_LIST',
  FETCH_TESTPAPER: 'testpaper/FETCH_TESTPAPER',
  CREATE_TESTPAPER: 'testpaper/CREATE_TESTPAPER',
  UPDATE_TESTPAPER: 'testpaper/UPDATE_TESTPAPER',
  DELETE_TESTPAPER: 'testpaper/DELETE_TESTPAPER',
  RESET: 'testpaper/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITestpaperMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TestpaperMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: TestpaperMySuffixState = initialState, action): TestpaperMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TESTPAPER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TESTPAPER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TESTPAPER):
    case REQUEST(ACTION_TYPES.UPDATE_TESTPAPER):
    case REQUEST(ACTION_TYPES.DELETE_TESTPAPER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TESTPAPER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TESTPAPER):
    case FAILURE(ACTION_TYPES.CREATE_TESTPAPER):
    case FAILURE(ACTION_TYPES.UPDATE_TESTPAPER):
    case FAILURE(ACTION_TYPES.DELETE_TESTPAPER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TESTPAPER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TESTPAPER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TESTPAPER):
    case SUCCESS(ACTION_TYPES.UPDATE_TESTPAPER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TESTPAPER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/testpapers';

// Actions

export const getEntities: ICrudGetAllAction<ITestpaperMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TESTPAPER_LIST,
  payload: axios.get<ITestpaperMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITestpaperMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TESTPAPER,
    payload: axios.get<ITestpaperMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITestpaperMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TESTPAPER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITestpaperMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TESTPAPER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITestpaperMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TESTPAPER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
