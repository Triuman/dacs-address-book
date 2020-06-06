import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import { IDatabase } from '../interfaces/database.interface'
import { IPersonCard } from '../interfaces/person-card.interface';
import { UserDb } from '../models/mongoose/user-schema';
import { PersonCardDb } from '../models/mongoose/person-card-schema';
import { IUser } from '../interfaces/user.interface';

export class Database implements IDatabase {
    private db?: mongoose.Connection;

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            var url = "mongodb://admin:admin123@ds125774.mlab.com:25774/dacs-address-book";

            //TODO: handle reconnect when the connection is lost
            mongoose.connect(url, { useNewUrlParser: true });
            this.db = mongoose.connection;
            this.db.on('error', err => {
                console.error.bind(console, 'connection error:');
                reject(err);
            });
            this.db.once('open', () => {
                console.log("Connected to the Database via mongoose.");
                resolve();
            });
        });
    }
    public disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db?.close()
                .finally(() => {
                    resolve();
                });
        });

    }

    //User
    public insertUser(user: IUser): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const userDb = new UserDb();
            userDb.username = user.username;
            userDb.password = user.password;
            try {
                await userDb.save();
                console.log('inserted a new user');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    public getUser(userId: string): Promise<IUser | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const _userId = new ObjectId(userId);
                const userDb = UserDb.findOne({ _id: _userId });
                resolve(userDb);
            } catch (err) {
                reject(err);
            }
        });
    }

    //PersonCard
    public insertPersonCard(userId: string, personCard: IPersonCard): Promise<void> {
        const _userId = new ObjectId(userId);
        return new Promise(async (resolve, reject) => {
            const personCardDb = new PersonCardDb();
            personCardDb.user = _userId;
            personCardDb.name = personCard.name;
            personCardDb.surname = personCard.surname;
            personCardDb.age = personCard.age;
            personCardDb.phone = personCard.phone;
            personCardDb.email = personCard.email;
            personCardDb.address = personCard.address;

            try {
                await personCardDb.save();
                await UserDb.findByIdAndUpdate(
                    userId,
                    { $push: { personCards: personCardDb._id } },
                    { new: true }
                );
                console.log('inserted a new personCard');
                resolve();

            } catch (err) {
                reject(err)
            }
        });
    }
    public updatePersonCard(person: IPersonCard): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await PersonCardDb.updateOne({ _id: person.dbId }, person);
                console.log('updated a personCard');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    public deletePersonCard(userId: string, cardId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const personCardDb = await PersonCardDb.findOneAndDelete({ _id: cardId, user: { _id: userId } });
                if (personCardDb) {
                    await UserDb.findByIdAndUpdate(
                        userId,
                        { $pull: { personCards: new ObjectId(cardId) } }
                    );
                    console.log('deleted a personCard');
                    resolve();
                } else {
                    reject('PersonCardDb couldnt be found');
                }
            } catch (err) {
                reject(err);
            }
        });
    }
    public getPersonCard(userId: string, cardId: string): Promise<IPersonCard | null> {
        return new Promise(async (resolve, reject) => {
            try {
                //We use userId to make sure this card is of this user.
                const personCardDb = await PersonCardDb.findOne({ _id: cardId, user: { _id: userId } });
                resolve(personCardDb);
            } catch (err) {
                reject(err);
            }
        });
    }
    public getAllPersonCards(userId: string): Promise<IPersonCard[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const personCardDbs = await PersonCardDb.find({ user: { _id: userId } });
                resolve(personCardDbs);
            } catch (err) {
                reject(err);
            }
        });
    }
}