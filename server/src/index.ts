import App from "./app";
import { instance as db } from "./databases/database";

require('dotenv').config();

const app = new App();
db.connect(<string>process.env.DB_URL)
    .then(() => {
        app.listen(Number(process.env.PORT) || 8888);
    });
