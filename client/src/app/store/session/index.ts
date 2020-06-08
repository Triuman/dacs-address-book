import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import { RootState, AppThunk } from '..';
import { IUser } from '../../models/User.interface';
import { ICredentials } from '../../models/Credentials.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { IRegisterInfo } from '../../models/RegisterInfo.interface';
import { NavigationService } from '../../services/navigation.service';
import { TokenPayload } from '../../models/TokenPayload.interface';


interface ISessionState {
  isSessionLoaded: boolean,
  user: IUser | null,
  token: string | null
}

const initialState: ISessionState = {
  isSessionLoaded: false,
  user: null,
  token: null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<{ user: IUser, token: string }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isSessionLoaded = true;
      localStorage.setItem('token', state.token);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    // setToken: (state, action: PayloadAction<string>) => {
    //   state.token = action.payload;
    //   state.isSessionLoaded = true;
    //   localStorage.setItem('token', state.token);
    // },
    // setUser: (state, action: PayloadAction<IUser>) => {
    //   state.user = action.payload;
    //   state.isSessionLoaded = true;
    //   localStorage.setItem('user', JSON.stringify(state.user));
    // },
    logout: state => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
});


const { setSession, logout } = sessionSlice.actions;

export { logout };

//TS thinks that dispatch returns whatever you give it to. But it actually returns the type inside AppThunk<>
//So, to get the promise, we need to trick TS by putting  | Promise<string>, so that we can use dispatch result as a promise
export const loadSession = (): AppThunk | Promise<string> => dispatch => new Promise<string>((resolve, reject) => {
  console.log('loadSession');
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  if (token && userJson) {
    resolve(token);
    const user = JSON.parse(userJson);
    dispatch(setSession({ user, token }));
    // dispatch(setToken(token));
    // dispatch(setUser(user));
  }
});

export const login = (credentials: ICredentials): AppThunk => dispatch => {
  AuthenticationService.login(credentials)
    .then(authResult => {
      handleToken(authResult.token, dispatch);
    });
};
export const register = (registerInfo: IRegisterInfo): AppThunk => dispatch => {
  AuthenticationService.register(registerInfo)
    .then(authResult => {
      handleToken(authResult.token, dispatch);
    });
};

function handleToken(token: string, dispatch: any) {
  //TODO: change type of dispatch
  //TODO: get user information separately
  try {
    const tokenPayload = <TokenPayload>jwtDecode(token);
    const user: IUser = { id: tokenPayload.id, username: tokenPayload.username };
    dispatch(setSession({ user, token }));
    // dispatch(setToken(token));
    // dispatch(setUser(user));
    NavigationService.toAddressBook(); //Im not sure where to redirect to UserArea yet.
  } catch (error) {

  }
}

export const selectToken = (state: RootState) => state.session.token;
export const selectUser = (state: RootState) => state.session.user;
export const selectIsLoggedIn = (state: RootState) => !!state.session.token;
export const selectIsSessionLoaded = (state: RootState) => state.session.isSessionLoaded;

export default sessionSlice.reducer;
