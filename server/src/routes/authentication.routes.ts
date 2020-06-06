import express from 'express';
import jwt from 'jsonwebtoken';

import { instance as db } from '../databases/database';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.getUser(username, password);
        if (!user)
            return res.sendStatus(401);
        const token = jwt.sign({ id: user.dbId, username: user.username }, process.env.SECRET_KEY || '');
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/register', async (req, res) => {
    // try {
    //     const { username, password } = req.body;
    //     const user = await db.getUser(username, password);
    //     if (!user)
    //         return res.sendStatus(401);
    //     const token = jwt.sign({ id: user.dbId, username: user.username }, process.env.SECRET_KEY || '');
    //     res.status(200).json({ token });
    // } catch (err) {
    //     res.status(500).send(err);
    // }
});

export default router;