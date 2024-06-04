const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Add axios for making API requests
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/login', (req, res) => {
    res.redirect('/lyrics');
});

app.post('/signup', (req, res) => {
    res.redirect('/lyrics');
});

app.get('/lyrics', (req, res) => {
    res.render('lyrics', { lyrics: null });
});

app.post('/lyrics', async (req, res) => {
    const { artist, title } = req.body;

    console.log(`Received form data: Artist - ${artist}, Title - ${title}`); // Corrected syntax

    try {
        // Fetch lyrics from Lyrics.ovh API
        const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`); // Corrected URL format
        const lyrics = response.data.lyrics;

        res.render('lyrics', { lyrics: { artist, title, lyrics } });
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        res.render('lyrics', { lyrics: null });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Corrected syntax
});
