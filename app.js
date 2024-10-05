import express from 'express';
import bp from 'body-parser';
import authRoutes from './routes/auth.routes.js';
import geminiRoutes from './routes/gemini.routes.js';
import connectDatabase from './database/Mongo.database.js';
import sessions from 'express-session';

const app = express();

app.use(
    sessions({
      secret: 'some secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      },
      resave: true,
      saveUninitialized: false,
    })
  );


const PORT = process.env.PORT || 8000;

// Setting up viewport for EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// BE routes
app.use('/auth', authRoutes);
app.use('/gemini', geminiRoutes);

// Views
app.get('/', (req, res) => {
    res.render('pages/index',{user : req.session.existingUser});
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.get('/chatbot', (req, res) => {
    res.render('pages/chatbot');
});

app.get('/profile', (req, res) => {
    res.render('pages/profile');
});

app.get('/signup',(_,res) => {
    res.render('pages/profile')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    connectDatabase();
});
