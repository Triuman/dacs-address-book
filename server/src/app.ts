import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

import addressBookRoutes from './routes/address-book.routes'
import authenticationRoutes from './routes/authentication.routes'

class App {
    public app: express.Application

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.mountRoutes();
    }

    private mountRoutes(): void {
        //TODO: make an authentication middleware that decodes token and use authorization for only comparing userIds.
        this.app.use('/authentication', authenticationRoutes);
        this.app.use('/addressbook', addressBookRoutes);
    }

    public listen(port: number) {
        this.app.listen(port, () =>
            console.log(`Address Book App listening on port ${port}!`),
        );
    }
}

export default App