import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const CHANGE_TITLE = '[UI] Change Title';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class ChangeTitle implements Action {
  readonly type = CHANGE_TITLE;

  constructor(public payload: string) {}
}

export type UIActions = StartLoading | StopLoading | ChangeTitle;
