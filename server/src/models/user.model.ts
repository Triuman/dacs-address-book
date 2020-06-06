import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
    dbId: string;
    username: string;
    password: string;

    constructor(dbId: string, username: string, password: string) {
        this.dbId = dbId;
        this.username = username;
        this.password = password;
    }
}