const express = require("express");
const path = require("node:path");
const appRouter = require("./routes/appRouter");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
// for serving static files/images
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// app.use('/', appRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server listening on port: ${PORT}`);
});