import express from "express";
import cors from "cors";
const app = express();
app.use(cors());


app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello!");
});

app.listen(process.env.SERVER_PORT || 3000, () => console.log("Server in ascolto sulla porta 3000..."));