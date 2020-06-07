import express from 'express';
import jwt from 'jsonwebtoken';

import { instance as db } from '../databases/database';
import { IUserDb, UserDb } from '../models/mongoose/user-schema';
import { IUser } from '../interfaces/user.interface';
import { TokenPayload } from '../models/token-payload.model';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userDb: IUserDb | null = await db.getUser(username, password);
        if (!userDb)
            return res.sendStatus(401);
        res.status(200).json({ token: getToken(userDb) });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUsernameExist = await db.isUsernameExist(username);
        if (isUsernameExist) {
            return res.status(409).json({ message: 'There is already a user with this username.' });
        }
        const userDb: IUserDb = new UserDb();
        userDb.username = username;
        userDb.password = password;
        userDb.dbId = await db.insertUser(userDb);
        res.status(200).json({ token: getToken(userDb) });
    } catch (err) {
        res.status(500).send(err);
    }
});

function getToken(user: IUser) {
    //Using Object.assign to get a plain object for jwt.sign
    //https://stackoverflow.com/questions/37300338/how-can-i-convert-a-typescript-object-to-a-plain-object
    return 'Berarer ' + jwt.sign(Object.assign({}, new TokenPayload(user)), process.env.SECRET_KEY || '');
}

export default router;