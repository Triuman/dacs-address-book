import mongoose, { Schema, Document, Query } from 'mongoose'

import { IPersonCard } from '../../interfaces/person-card.interface';
import { IUserDb, UserDb } from './user-schema';

interface IPersonCardDb extends Document, IPersonCard {
    user: IUserDb['_id'];
}

const PersonCardSchema = new mongoose.Schema({
    id: Number,
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    name: String,
    surname: String,
    age: Number,
    phone: String,
    email: String,
    address: String
});

const PersonCardDb = mongoose.model<IPersonCardDb>('PersonCards', PersonCardSchema);
export { PersonCardDb, IPersonCardDb };