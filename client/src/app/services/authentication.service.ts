import WebService from "./web.service";
import { ILogin } from "../models/Login.interface";
import { setToken } from "../store/session";

export const AuthenticationService = {
    register,
    login,
    logout
};


function register(username: string, password: string): Promise<string> {
    return WebService.post<ILogin, string>('/user/register', { username, password });
}

function login(username: string, password: string): Promise<string> {
    return WebService.post<ILogin, string>('/user/login', { username, password });
}

function logout() {
    setToken('');
}