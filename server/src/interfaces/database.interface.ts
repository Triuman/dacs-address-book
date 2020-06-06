import { IPersonCard } from "./person-card.interface";
import { IUser } from "./user.interface";

export interface IDatabase {
    connect(): Promise<void>,
    disconnect(): Promise<void>,
    insertUser(user: IUser): Promise<void>,
    getUser(userId: string): Promise<IUser | null>,
    insertPersonCard(userId: string, person: IPersonCard): Promise<void>,
    updatePersonCard(personcard: IPersonCard): Promise<void>,
    deletePersonCard(userId: string, cardId: string): Promise<void>,
    getPersonCard(userId: string, cardId: string): Promise<IPersonCard | null>,
    getAllPersonCards(userId: string): Promise<IPersonCard[]>
}