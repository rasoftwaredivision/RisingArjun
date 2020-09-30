import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITestresultMySuffix, defaultValue } from 'app/shared/model/testresult-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_TESTRESULT_LIST: 'testresult/FETCH_TESTRESULT_LIST',
  FETCH_TESTRESULT: 'testresult/FETCH_TESTRESULT',
  CREATE_TESTRESULT: 'testresult/CREATE_TESTRESULT',
  UPDATE_TESTRESULT: 'testresult/UPDATE_TESTRESULT',
  DELETE_TESTRESULT: 'testresult/DELETE_TESTRESULT',
  RESET: 'testresult/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITestresultMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TestresultMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: TestresultMySuffixState = initialState, action): TestresultMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TESTRESULT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TESTRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TESTRESULT):
    case REQUEST(ACTION_TYPES.UPDATE_TESTRESULT):
    case REQUEST(ACTION_TYPES.DELETE_TESTRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TESTRESULT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TESTRESULT):
    case FAILURE(ACTION_TYPES.CREATE_TESTRESULT):
    case FAILURE(ACTION_TYPES.UPDATE_TESTRESULT):
    case FAILURE(ACTION_TYPES.DELETE_TESTRESULT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TESTRESULT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TESTRESULT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TESTRESULT):
    case SUCCESS(ACTION_TYPES.UPDATE_TESTRESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TESTRESULT):
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

const apiUrl = 'api/testresults';

// Actions

export const getEntities: ICrudGetAllAction<ITestresultMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TESTRESULT_LIST,
  payload: axios.get<ITestresultMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITestresultMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TESTRESULT,
    payload: axios.get<ITestresultMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITestresultMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TESTRESULT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITestresultMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TESTRESULT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITestresultMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TESTRESULT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
