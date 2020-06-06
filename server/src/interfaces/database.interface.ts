import { IPersonCard } from "./person-card.interface";
import { IUser } from "./user.interface";

export interface IDatabase {
    connect(): Promise<void>,
    disconnect(): Promise<void>,
    insertUser(user: IUser): Promise<void>,
    getUser(username: string, password: string): Promise<IUser | null>,
    getUser(userId: string): Promise<IUser | null>,
    insertPersonCard(userId: string, person: IPersonCard): Promise<void>,
    updatePersonCard(userId: string, cardId: string, personCard: IPersonCard): Promise<void>,
    deletePersonCard(userId: string, cardId: string): Promise<void>,
    getPersonCard(userId: string, cardId: string): Promise<IPersonCard | null>,
    getAllPersonCards(userId: string): Promise<IPersonCard[]>
}