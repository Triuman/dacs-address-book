import express from 'express';
import cors from 'cors';

import router from './api'

class App {
    public app: express.Application

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.app.use('/', router);
    }

    public listen(port: number) {
        this.app.listen(port, () =>
            console.log('Example app listening on port 3000!'),
        );
    }
}

export default App