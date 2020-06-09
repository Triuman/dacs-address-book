import App from "./app";
import { instance as db } from "./databases/database";

//require('dotenv').config();


console.log("App started!");

const app = new App();
db.connect(<string>process.env.DB_URL)
    .then(() => {
        console.log("Connected to DB!");
        app.listen(Number(process.env.PORT) || 8888);
    });
