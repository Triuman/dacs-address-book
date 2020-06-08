import express from 'express';

import { authorize } from '../middlewares/authorization.middleware';
import { instance as db } from '../databases/database';
import { IPersonCardDb, PersonCardDb } from '../models/mongoose/person-card-schema';
import { PersonCard } from '../models/person-card.model';

const router = express.Router();

//TODO: Do error handling globally

router.use('/:userId', authorize);

router.get('/:userId/:personCardId', async (req, res) => {
    const { userId, personCardId } = req.params;
    const personCardDb = await db.getPersonCard(userId, personCardId);
    if (personCardDb) {
        personCardDb.dbId = personCardDb._id
        res.status(200).json(new PersonCard(personCardDb));
    } else {
        res.sendStatus(404);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const personCardDbs = await db.getAllPersonCards(userId);
        const personCards: PersonCard[] = [];
        for (let i = 0; i < personCardDbs.length; i++) {
            if (personCardDbs[i])
                personCardDbs[i].dbId = personCardDbs[i]._id
            personCards.push(new PersonCard(personCardDbs[i]));
        }
        res.status(200).json(personCards);

    } catch (err) {
        res.status(500).json({ err });
    }
});

router.post('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const personCard = <IPersonCardDb>req.body;
        await db.insertPersonCard(userId, personCard);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ err });
    }
});


router.put('/:userId/:personCardId', async (req, res) => {
    try {
        const { userId, personCardId } = req.params;
        const personCard = <IPersonCardDb>req.body;
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