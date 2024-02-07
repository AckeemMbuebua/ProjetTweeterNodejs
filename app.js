const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tweets = []; // le tableau qui stocke les tweets

//Pour la récupération et l'affichage de tous les tweets
app.get('/tweets', (req, res) => {
    res.json(tweets);
});

//  L'ajouter un nouveau tweet
app.post('/tweets', (req, res) => {
    const { userId, id, title, body, url, thumbnailUrl, like, repost } = req.body;
    if (userId && userId) {
        const newTweet = {
            userId: userId,
            id: id,
            title: title,
            body: body,
            url: url,
            thumbnailUrl: thumbnailUrl,
            like: like,
            repost: repost
        };
        tweets.push(newTweet);
        res.status(201).json({ message: 'Tweet ajouté avec succès' });
    } else {
        res.status(400).json({ error: 'Données incomplètes' });
    }
});

// Sppression d'un tweet par son index
app.delete('/tweets/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tweets.length) {
        const deletedTweet = tweets.splice(index, 1);
        res.json({ message: 'Tweet supprimé avec succès', tweet: deletedTweet });
    } else {
        res.status(404).json({ error: 'Index de tweet invalide' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

app.get("/", (req, res) => {
    console.log("Salut à tous");
});