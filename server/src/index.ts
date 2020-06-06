import App from "./app";
import { Database } from "./databases/database-mongoose";
import { User } from "./models/user.model";

const app = new App();
app.listen(8888);

const db = new Database();

db.connect()
    .then(() => {
        // const user = new User('hasan lastest', 'new password');
        // db.insertUser(user);
    });