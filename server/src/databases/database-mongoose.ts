import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import { IDatabase } from '../interfaces/database.interface'
import { IUser } from '../interfaces/user.interface';
import { IPersonCard } from '../interfaces/person-card.interface';
import { UserDb, IUserDb } from '../models/mongoose/user-schema';
import { PersonCardDb } from '../models/mongoose/person-card-schema';

export class Database implements IDatabase {
    constructor() {
        //https://mongoosejs.com/docs/deprecations.html
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
    }

    private db?: mongoose.Connection;

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!process.env.DB_URL) {
                throw new Error("DB_URL environment variable is undefined!");
            }
            const url = process.env.DB_URL || '';

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
    public getUser(userId: string): Promise<IUser | null>;
    public getUser(username: string, password?: string): Promise<IUser | null> {
        return new Promise(async (resolve, reject) => {
            try {
                let userDb;
                if (!password) {
                    const userId = username;
                    const _userId = new ObjectId(userId);
                    userDb = await UserDb.findOne({ _id: _userId });
                } else {
                    userDb = await UserDb.findOne({ username, password });
                }
                //We need this id to put into JWT token
                if (userDb)
                    userDb.dbId = userDb?._id;
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
    public updatePersonCard(userId: string, cardId: string, personCard: IPersonCard): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await PersonCardDb.updateOne({ _id: cardId, user: { _id: userId } }, personCard);
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
