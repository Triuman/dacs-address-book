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
    public insertUser(user: IUser): Promise<void> {
        return new Promise((resolve, reject) => {
            const userDb = new UserDb();
            userDb.username = user.username;
            userDb.password = user.password;
            userDb.save()
                .then(() => {
                    console.log('inserted a new user');
                    resolve();
                })
                .catch(err => reject(err));
        });
    }
    public getPersonCard(userId: string, cardId: string): Promise<IPersonCard | null> {
        const _userId = new ObjectId(userId);
        const _cardId = new ObjectId(cardId);
        return new Promise((resolve, reject) => {
            PersonCardDb.findOne({ _id: _cardId, user: { _id: _userId } })
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public getAllPersonCards(): Promise<IPersonCard[]> {
        return new Promise((resolve, reject) => { });
    }
    public insertPersonCard(person: IPersonCard): Promise<void> {
        return new Promise((resolve, reject) => {

        });
    }
    public updatePersonCard(person: IPersonCard): Promise<void> {
        return new Promise((resolve, reject) => { });
    }
    public deletePersonCard(id: number): Promise<void> {
        return new Promise((resolve, reject) => { });
    }
}