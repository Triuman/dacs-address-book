import express from 'express';
import jwt from 'jsonwebtoken';

const authorize = (req: express.Request, res: express.Response, next: any) => {
    try {
        const token = (<string>req.headers['authorization']).split(' ')[1];
        const { userId } = req.params;
        const { id, username } = <{ id: string, username: string }>jwt.verify(token, process.env.SECRET_KEY || '');
        if (!id || !username) {
            res.sendStatus(500);
            return;
        }
        if (userId != id) {
            res.sendStatus(403);
            return;
        }
        next();
    } catch (err) {
        res.status(500).send(err);
    }
};

export { authorize }