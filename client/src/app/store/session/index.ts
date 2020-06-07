import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '..';
import { history } from '../../helpers/history'
import { IUser } from '../../models/User.interface';
import { ICredentials } from '../../models/Credentials.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { IRegisterInfo } from '../../models/RegisterInfo.interface';


interface ISessionState {
  user: IUser | null,
  token: string | null
}

const initialState: ISessionState = {
  user: null,
  token: null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    },
    logout: state => {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
});


const { setToken, logout } = sessionSlice.actions;

export { logout };

export const login = (credentials: ICredentials): AppThunk => dispatch => {
  AuthenticationService.login(credentials)
    .then(authResult => {
      //TODO: verify the token and 
      dispatch(setToken(authResult.token));
      history.push('/addressbook');
    });
};
export const register = (registerInfo: IRegisterInfo): AppThunk => dispatch => {
  AuthenticationService.register(registerInfo)
    .then(authResult => {
      //TODO: verify the token and 
      dispatch(setToken(authResult.token));
      history.push('/addressbook');
    });
};

export const selectToken = (state: RootState) => state.session.token;
export const selectUser = (state: RootState) => state.session.user;
export const selectIsLoggedIn = (state: RootState) => !!state.session.token;

export default sessionSlice.reducer;
