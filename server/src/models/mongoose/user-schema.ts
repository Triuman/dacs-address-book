import mongoose, { Schema } from 'mongoose'

import { IUserDb } from '../../interfaces/user-db.interface';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personCards: [{ type: Schema.Types.ObjectId, ref: 'PersonCards' }]
});

const UserDb = mongoose.model<IUserDb>('Users', UserSchema);
export { UserDb };