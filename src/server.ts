import { app } from "./app";
import { PORT } from "./config/env";
app.listen(PORT, (err?: Error) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${PORT}`);
});
