export interface IUser {
    dbId: string; //cannot name as id or _id because it conflicts with mongoose Document
    username: string;
    password: string;
}