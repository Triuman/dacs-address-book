import { IPersonCard } from "./person-card.interface";

export interface IDatabase {
    connect(): Promise<void>,
    disconnect(): Promise<void>,
    getPersonCard(userId: string, cardId: string): Promise<IPersonCard | null>,
    getAllPersonCards(): Promise<IPersonCard[]>,
    insertPersonCard(personcard: IPersonCard): Promise<void>,
    updatePersonCard(personcard: IPersonCard): Promise<void>,
    deletePersonCard(id: number): Promise<void>
}