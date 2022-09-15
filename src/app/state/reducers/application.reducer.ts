// import { createReducer, on } from '@ngrx/store';
// import { ApplicationState } from '@models/state/Application.state';
// import {
//   errorMessage,
//   loading,
//   setAction,
//   setUpdatedField,
// } from '../actions/application.actions';

// export const initialState: ApplicationState = {
//   loading: false,
//   errorMessage: '',
//   action: '',
//   updatedField: [],
// };

// export const ApplicationReducer = createReducer(
//   initialState,
//   on(loading, (state, { status }) => {
//     return {
//       ...state,
//       loading: status,
//     };
//   }),
//   on(errorMessage, (state, { message }) => {
//     return {
//       ...state,
//       errorMessage: message,
//     };
//   }),
//   on(setAction, (state, { action }) => {
//     return {
//       ...state,
//       action: action,
//     };
//   }),
//   on(setUpdatedField, (state, { field }) => {
//     const index = state.updatedField.findIndex((updated) => updated === field);
//     let fields = state.updatedField;
//     if (index === -1) {
//       fields = [...fields, field];
//     }
//     return {
//       ...state,
//       updatedField: fields,
//     };
//   })
// );
