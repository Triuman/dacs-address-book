import { IPersonCard } from "../interfaces/person-card.interface";

export class PersonCard implements IPersonCard {
    dbId: string | null;
    name: string;
    surname: string;
    age: number;
    phone: string;
    email: string;
    address: string;

    constructor(dbId: string | null,
        name: string,
        surname: string,
        age: number,
        phone: string,
        email: string,
        address: string) {

        this.dbId = dbId;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.address = address;

    }
}