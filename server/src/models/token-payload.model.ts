import { IUser } from "../interfaces/user.interface";

export class TokenPayload {
    id: string;
    username: string;

    constructor(user: IUser) {
        this.id = user.dbId + '';
        this.username = user.username;
    }
}