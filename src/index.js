const cors = require(`cors`);
const createError = require(`http-errors`);
const dotenv = require(`dotenv`);
const express = require(`express`);
const helmet = require(`helmet`);
const mongoose = require(`mongoose`);
const morgan = require(`morgan`);

dotenv.config();

const api = require(`./api`);

const port = process.env.PORT || 3030;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === `production` ? `tiny` : `dev`));

app.use(`/api/v1`, api);

app.use((req, res, next) => {
    next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.json({
        ok: false,
        message: error.message,
    });
});

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log(`Connected to Mongo`);
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    });
