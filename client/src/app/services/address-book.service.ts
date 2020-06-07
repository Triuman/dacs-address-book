import { HttpService } from "./http.service";
import { IPersonCard } from "../models/PersonCard.interface";

export const AddressBookService = {
    getAllPersonCards,
    addPersonCard,
    updatePersonCard,
    deletePersonCard
};

const basePath = '/addressbook';

function getAllPersonCards(token: string, userId: string): Promise<IPersonCard[]> {
    return HttpService.get<IPersonCard[]>(basePath + `/${userId}`, token);
}

function addPersonCard(token: string, userId: string, personCard: IPersonCard): Promise<void> {
    return HttpService.post<IPersonCard, void>(basePath + `/${userId}`, token, personCard);
}

function updatePersonCard(token: string, userId: string, personCard: IPersonCard): Promise<void> {
    return HttpService.put<IPersonCard, void>(basePath + `/${userId}/${personCard.dbId}`, token, personCard);
}

function deletePersonCard(token: string, userId: string, personCardId: string): Promise<void> {
    return HttpService.delete<void>(basePath + `/${userId}/${personCardId}`, token);
}
