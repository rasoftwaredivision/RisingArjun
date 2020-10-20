import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITopicMySuffix, defaultValue } from 'app/shared/model/topic-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_TOPIC_LIST: 'topic/FETCH_TOPIC_LIST',
  FETCH_TOPIC: 'topic/FETCH_TOPIC',
  CREATE_TOPIC: 'topic/CREATE_TOPIC',
  UPDATE_TOPIC: 'topic/UPDATE_TOPIC',
  DELETE_TOPIC: 'topic/DELETE_TOPIC',
  RESET: 'topic/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITopicMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TopicMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: TopicMySuffixState = initialState, action): TopicMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TOPIC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TOPIC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TOPIC):
    case REQUEST(ACTION_TYPES.UPDATE_TOPIC):
    case REQUEST(ACTION_TYPES.DELETE_TOPIC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TOPIC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TOPIC):
    case FAILURE(ACTION_TYPES.CREATE_TOPIC):
    case FAILURE(ACTION_TYPES.UPDATE_TOPIC):
    case FAILURE(ACTION_TYPES.DELETE_TOPIC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOPIC_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOPIC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TOPIC):
    case SUCCESS(ACTION_TYPES.UPDATE_TOPIC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TOPIC):
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

const apiUrl = 'api/topics';

// Actions

export const getEntities: ICrudGetAllAction<ITopicMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TOPIC_LIST,
    payload: axios.get<ITopicMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITopicMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TOPIC,
    payload: axios.get<ITopicMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITopicMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TOPIC,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITopicMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TOPIC,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITopicMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TOPIC,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
