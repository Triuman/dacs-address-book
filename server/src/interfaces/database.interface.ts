import { IPersonCard } from "./person-card.interface";

export interface IDatabase {
    connect(): void,
    disconnect(): void,
    getAllPersonCards(): IPersonCard[],
    insertPersonCard(personcard: IPersonCard): void,
    updatePersonCard(personcard: IPersonCard): void,
    deletePersonCard(id: number): void
}