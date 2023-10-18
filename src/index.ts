import express from "express";
import router from './routes/index'

const app = express();
const port = process.env.PORT || 9000;

router(app);

app.get("/", (req, res) => {
    res.send({
      message: "Hello, World!",
    });
});

app.get("/random", (req, res) => {
    res.send({
      number: Math.floor(Math.random() * 100),
    });
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});