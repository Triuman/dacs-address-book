import { IPersonCard } from "../interfaces/person-card.interface";

//This model is used only when we want to send data to the client.
export class PersonCard implements IPersonCard {
    dbId: string;
    name: string;
    surname: string;
    age: number;
    phone: string;
    email: string;
    address: string;

    constructor(personCard?: IPersonCard | null) {
        if (personCard) {
            this.dbId = personCard.dbId;
            this.name = personCard.name;
            this.surname = personCard.surname;
            this.age = personCard.age;
            this.phone = personCard.phone;
            this.email = personCard.email;
            this.address = personCard.address;
        } else {
            this.dbId = '';
            this.name = '';
            this.surname = '';
            this.age = 0;
            this.phone = '';
            this.email = '';
            this.address = '';
        }

    }
}