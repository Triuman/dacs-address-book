import { IUser } from "../interfaces/user.interface";

//This model is used only when we want to send data to the client.
export class User implements IUser {
    dbId: string;
    username: string;
    password: string;

    constructor(user?: IUser) {
        if (user) {
            this.dbId = user.dbId;
            this.username = user.username;
            this.password = user.password;
        } else {
            this.dbId = '';
            this.username = '';
            this.password = '';
        }
    }
}