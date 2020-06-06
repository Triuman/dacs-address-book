import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

import addressBookRoutes from './routes/address-book.routes'
import userRoutes from './routes/user.routes'

class App {
    public app: express.Application

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.app.use('/addressbook', addressBookRoutes);
        this.app.use('/user', userRoutes);
    }

    public listen(port: number) {
        this.app.listen(port, () =>
            console.log('Example app listening on port 3000!'),
        );
    }
}

export default App