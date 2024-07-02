import express from 'express'
import bp from'body-parser'
import connectDatabase from './database/Mongo.database.js';

const app = express();

const PORT = process.env.PORT || 3000

//setting up viewport for ejs
app.set('view engine', 'ejs');

app.use(express.static("./public"))

app.use(bp.json());
app.use(bp.urlencoded({extended: false}))

// Home route
app.get('/', (req, res) => {
    res.render('../views/base');
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    connectDatabase();
})