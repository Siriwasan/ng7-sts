import { Action } from '@ngrx/store';

import { UIActions, START_LOADING, STOP_LOADING, CHANGE_TITLE } from './ui.actions';

export interface State {
  isLoading: boolean;
  title: string;
}

const initialState: State = {
  isLoading: false,
  title: 'Test'
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
      case CHANGE_TITLE:
      return {
        ...state,
        title: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getTitle = (state: State) => state.title;
