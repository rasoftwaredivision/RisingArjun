import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISubjectbasefeeMySuffix, defaultValue } from 'app/shared/model/subjectbasefee-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_SUBJECTBASEFEE_LIST: 'subjectbasefee/FETCH_SUBJECTBASEFEE_LIST',
  FETCH_SUBJECTBASEFEE: 'subjectbasefee/FETCH_SUBJECTBASEFEE',
  CREATE_SUBJECTBASEFEE: 'subjectbasefee/CREATE_SUBJECTBASEFEE',
  UPDATE_SUBJECTBASEFEE: 'subjectbasefee/UPDATE_SUBJECTBASEFEE',
  DELETE_SUBJECTBASEFEE: 'subjectbasefee/DELETE_SUBJECTBASEFEE',
  RESET: 'subjectbasefee/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISubjectbasefeeMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SubjectbasefeeMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: SubjectbasefeeMySuffixState = initialState, action): SubjectbasefeeMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUBJECTBASEFEE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUBJECTBASEFEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SUBJECTBASEFEE):
    case REQUEST(ACTION_TYPES.UPDATE_SUBJECTBASEFEE):
    case REQUEST(ACTION_TYPES.DELETE_SUBJECTBASEFEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SUBJECTBASEFEE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUBJECTBASEFEE):
    case FAILURE(ACTION_TYPES.CREATE_SUBJECTBASEFEE):
    case FAILURE(ACTION_TYPES.UPDATE_SUBJECTBASEFEE):
    case FAILURE(ACTION_TYPES.DELETE_SUBJECTBASEFEE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBJECTBASEFEE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBJECTBASEFEE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUBJECTBASEFEE):
    case SUCCESS(ACTION_TYPES.UPDATE_SUBJECTBASEFEE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUBJECTBASEFEE):
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

const apiUrl = 'api/subjectbasefees';

// Actions

export const getEntities: ICrudGetAllAction<ISubjectbasefeeMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUBJECTBASEFEE_LIST,
  payload: axios.get<ISubjectbasefeeMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISubjectbasefeeMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUBJECTBASEFEE,
    payload: axios.get<ISubjectbasefeeMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISubjectbasefeeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUBJECTBASEFEE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISubjectbasefeeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUBJECTBASEFEE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISubjectbasefeeMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUBJECTBASEFEE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
