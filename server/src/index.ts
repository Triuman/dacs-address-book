import App from "./app";
import { instance as db } from "./databases/database";
import { User } from "./models/user.model";
import { PersonCard } from "./models/person-card.model";

require('dotenv').config();

const app = new App();
app.listen(Number(process.env.PORT) || 8888);

db.connect()
    .then(() => {
        // const user = new User('hasan lastest', 'new password');
        // db.insertUser(user);

        // db.getUser('5edbaadcb5028f275ce5297e')
        //     .then(user => {
        //         console.info(user);
        //     })

        // const personCard = new PersonCard(null, 'card hasan 222', 'fggggg222 ', 22, '05552312314', 'qwewqe@weqrwq2222.com', 'ooooo  loinngngng addresss');
        // db.insertPersonCard('5edbaadcb5028f275ce5297e', personCard);


        // const personCard = new PersonCard('5edbb5379560984498c07066', 'new name', '99999', 11, 'new number', 'qwewqe@weqrwq.com', 'veryyy  loinngngng addresss');
        // db.updatePersonCard(personCard);

        // db.deletePersonCard('5edbaadcb5028f275ce5297e', '5edbc477f1ca774408ae08c8');


        // db.getPersonCard('5edbaadcb5028f275ce5297e', '5edbcc676057e413543cbd50')
        //     .then(personCard => {
        //         console.info(personCard);
        //     });


        // db.getAllPersonCards('5edbaadcb5028f275ce5297e')
        //     .then(personCards => {
        //         console.info(personCards);
        //     });
    });