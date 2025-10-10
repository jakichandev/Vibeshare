import Express = require("express");
const cors = require("cors");
const app = Express();
app.use(cors());


app.get("/", (req: Express.Request, res: Express.Response) => {
    res.send("Hello!");
});

app.listen(3000, () => console.log("Hola"));

