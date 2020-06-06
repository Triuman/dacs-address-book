import { Document } from "mongoose";

import { IUser } from "./user.interface";

export interface IUserDb extends Document, IUser {
}