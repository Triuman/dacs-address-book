// import { MongoClient, Db } from 'mongodb';

// import { IDatabase } from '../models/interfaces/database.interface'
// import { IPersonCard } from '../models/interfaces/person-card.interface';

// export class Database implements IDatabase {
//     private db?: MongoClient;
//     private dbo?: Db;
//     public connect(): Promise<void> {
//         return new Promise((resolve, reject) => {
//             var url = "mongodb://admin:admin123@ds125774.mlab.com:25774/dacs-address-book";

//             MongoClient.connect(url)
//                 .then(db => {
//                     console.log("Connected to the Database.");
//                     this.db = db;
//                     this.dbo = db.db("mydb");
//                     resolve();
//                 })
//                 .catch(err => {
//                     reject(err);
//                 });
//         });
//     }
//     public disconnect(): Promise<void> {
//         return new Promise((resolve, reject) => {
//             this.db?.close()
//             .finally(() => {
//                 resolve();
//             });
//         });

//     }
//     public getPersonCard(id: number): Promise<IPersonCard> {
//         return new Promise((resolve, reject) => {
//             this.dbo?.collection("personCards").findOne({ id })
//                 .then(res => {
//                     resolve(res);
//                 })
//                 .catch(err => {
//                     reject(err);
//                 });
//         });
//     }
//     public getAllPersonCards(): Promise<IPersonCard[]> {
//         return new Promise((resolve, reject) => {});
//     }
//     public insertPersonCard(person: IPersonCard): Promise<void> {
//         return new Promise((resolve, reject) => {
//             this.dbo?.collection("personCards").insertOne(person)
//                 .then(res => {
//                     console.log("1 personCard inserted");
//                     resolve();
//                 })
//                 .catch(err => {
//                     reject(err);
//                 });
//         });
//     }
//     public updatePersonCard(person: IPersonCard): Promise<void> {
//         return new Promise((resolve, reject) => {});
//     }
//     public deletePersonCard(id: number): Promise<void> {
//         return new Promise((resolve, reject) => {});
//     }
// }