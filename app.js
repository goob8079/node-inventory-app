const express = require("express");
const path = require("node:path");
const appRouter = require("./routes/appRouter");
const { neon } = require("@neondatabase/serverless");
require("dotenv/config");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
// for serving static files/images
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());

const PORT = 3000;

app.use('/', appRouter);

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server listening on port: ${PORT}`);
});