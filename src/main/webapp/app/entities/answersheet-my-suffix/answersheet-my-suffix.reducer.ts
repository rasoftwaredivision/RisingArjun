import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAnswersheetMySuffix, defaultValue } from 'app/shared/model/answersheet-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_ANSWERSHEET_LIST: 'answersheet/FETCH_ANSWERSHEET_LIST',
  FETCH_ANSWERSHEET: 'answersheet/FETCH_ANSWERSHEET',
  CREATE_ANSWERSHEET: 'answersheet/CREATE_ANSWERSHEET',
  UPDATE_ANSWERSHEET: 'answersheet/UPDATE_ANSWERSHEET',
  DELETE_ANSWERSHEET: 'answersheet/DELETE_ANSWERSHEET',
  RESET: 'answersheet/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAnswersheetMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AnswersheetMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: AnswersheetMySuffixState = initialState, action): AnswersheetMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ANSWERSHEET_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ANSWERSHEET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ANSWERSHEET):
    case REQUEST(ACTION_TYPES.UPDATE_ANSWERSHEET):
    case REQUEST(ACTION_TYPES.DELETE_ANSWERSHEET):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ANSWERSHEET_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ANSWERSHEET):
    case FAILURE(ACTION_TYPES.CREATE_ANSWERSHEET):
    case FAILURE(ACTION_TYPES.UPDATE_ANSWERSHEET):
    case FAILURE(ACTION_TYPES.DELETE_ANSWERSHEET):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANSWERSHEET_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANSWERSHEET):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ANSWERSHEET):
    case SUCCESS(ACTION_TYPES.UPDATE_ANSWERSHEET):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ANSWERSHEET):
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

const apiUrl = 'api/answersheets';

// Actions

export const getEntities: ICrudGetAllAction<IAnswersheetMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ANSWERSHEET_LIST,
    payload: axios.get<IAnswersheetMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IAnswersheetMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ANSWERSHEET,
    payload: axios.get<IAnswersheetMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAnswersheetMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ANSWERSHEET,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAnswersheetMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ANSWERSHEET,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAnswersheetMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ANSWERSHEET,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
