import mongoose, { Schema } from 'mongoose'

import { IPersonCardDb } from '../../interfaces/person-card-db.interface';

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
export { PersonCardDb };