import { IDatabase } from "../interfaces/database.interface";
import { Database } from "./database-mongoose";

const instance: IDatabase = new Database();

export { instance }