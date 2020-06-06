import express from 'express';

import { authorize } from '../middlewares/authorization.middleware';
import { instance as db } from '../databases/database';
import { IPersonCard } from '../interfaces/person-card.interface';

const router = express.Router();

//TODO: Do error handling globally

router.use('/:userId', authorize);

router.get('/:userId/:personCardId', async (req, res) => {
    const { userId, personCardId } = req.params;
    const personCard = await db.getPersonCard(userId, personCardId);
    res.status(200).json({ personCard });
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const personCards = await db.getAllPersonCards(userId);
        res.status(200).json({ personCards });

    } catch (err) {
        res.status(500).json({ err });
    }
});

router.post('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const personCard = <IPersonCard>req.body;
        await db.insertPersonCard(userId, personCard);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ err });
    }
});


router.put('/:userId/:personCardId', async (req, res) => {
    try {
        const { userId, personCardId } = req.params;
        const personCard = <IPersonCard>req.body;
        await db.updatePersonCard(userId, personCardId, personCard);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.delete('/:userId/:personCardId', async (req, res) => {
    try {
        const { userId, personCardId } = req.params;
        await db.deletePersonCard(userId, personCardId);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ err });
    }
});


export default router;