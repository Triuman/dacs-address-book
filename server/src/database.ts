import { MongoClient, Db } from 'mongodb';

import { IDatabase } from './interfaces/database.interface'
import { PersonCard } from './models/person-card.model';

export class Database implements IDatabase {
    private db?: MongoClient;
    private dbo?: Db;
    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            var url = "mongodb://admin:admin123@ds125774.mlab.com:25774/dacs-address-book";

            MongoClient.connect(url)
                .then(db => {
                    console.log("Connected to the Database.");
                    this.db = db;
                    this.dbo = db.db("mydb");
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public disconnect() {
        this.db?.close();

    }
    public getAllPersonCards(): PersonCard[] {
        throw new Error();
    }
    public insertPersonCard(person: PersonCard): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dbo?.collection("personCards").insertOne(person)
                .then(res => {
                    console.log("1 personCard inserted");
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public updatePersonCard(person: PersonCard) {

    }
    public deletePersonCard(id: number) {

    }
}