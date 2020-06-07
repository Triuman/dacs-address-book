import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '..';

import { IUser } from '../../models/User.interface';
import { ILogin } from '../../models/Login.interface';


interface SessionState {
  user: IUser | null,
  token: string | null
}

const initialState: SessionState = {
  user: null,
  token: null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {

    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    removeToken: state => {
      state.token = null;
    }
  },
});

export const { setToken, removeToken } = sessionSlice.actions;


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAsync = (login: ILogin): AppThunk => dispatch => {
  //TODO: call login of api service and set the token when response arrives.
  setTimeout(() => {
    dispatch(setToken('token'));
  }, 1000);
};


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToken = (state: RootState) => state.session.token;

export default sessionSlice.reducer;
