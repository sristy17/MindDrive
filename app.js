import express from 'express';
import bp from 'body-parser';
import authRoutes from './routes/auth.routes.js';
import geminiRoutes from './routes/gemini.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Setting up viewport for EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

// BE routes
app.use('/auth', authRoutes);
app.use('/gemini', geminiRoutes);

// Views
app.get('/', (req, res) => {
    res.render('pages/index');
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

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
