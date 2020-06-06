import mongoose, { Schema, Document } from 'mongoose'

import { IUser } from '../../interfaces/user.interface';
import { IPersonCardDb } from './person-card-schema';

interface IUserDb extends Document, IUser {
    personCards: [IPersonCardDb['_id']]
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personCards: [{ type: Schema.Types.ObjectId, ref: 'PersonCards' }]
});

const UserDb = mongoose.model<IUserDb>('Users', UserSchema);
export { UserDb, IUserDb };