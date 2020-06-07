import { HttpService } from "./http.service";
import { IRegisterInfo } from "../models/RegisterInfo.interface";
import { ICredentials } from "../models/Credentials.interface";
import { IAuthenticationResult } from "../models/AuthenticationResult.interface";

export const AuthenticationService = {
    register,
    login
};

const basePath = '/authentication';

function register(registerInfo: IRegisterInfo): Promise<IAuthenticationResult> {
    return HttpService.post<IRegisterInfo, IAuthenticationResult>(basePath + '/register', '', registerInfo);
}

function login(credentials: ICredentials): Promise<IAuthenticationResult> {
    return HttpService.post<ICredentials, IAuthenticationResult>(basePath + '/login', '', credentials);
}