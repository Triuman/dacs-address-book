import { IUserDb } from "../models/mongoose/user-schema";
import { IPersonCardDb } from "../models/mongoose/person-card-schema";

export interface IDatabase {
    connect(url: string): Promise<void>,
    disconnect(): Promise<void>,
    insertUser(user: IUserDb): Promise<string>,
    isUsernameExist(username: string): Promise<boolean>,
    getUser(username: string, password: string): Promise<IUserDb | null>,
    getUser(userId: string): Promise<IUserDb | null>,
    insertPersonCard(userId: string, person: IPersonCardDb): Promise<void>,
    updatePersonCard(userId: string, cardId: string, personCard: IPersonCardDb): Promise<void>,
    deletePersonCard(userId: string, cardId: string): Promise<void>,
    getPersonCard(userId: string, cardId: string): Promise<IPersonCardDb | null>,
    getAllPersonCards(userId: string): Promise<IPersonCardDb[]>
}