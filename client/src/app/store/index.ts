import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import sessionReducer from './session';
import addressBookReducer from './address-book';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    addressBook: addressBookReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
