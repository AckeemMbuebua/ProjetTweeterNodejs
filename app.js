const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const routeTweets = require('./routes/routeTweets')
const routesUsers = require('./routes/routesUser');

app.use('/tweets', routeTweets);
app.use('/users', routesUsers);

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});























// let tweets = []; // le tableau qui stocke les tweets

// //Pour la récupération et l'affichage de tous les tweets
// app.get('/tweets', (req, res) => {
//     res.json(tweets);
// });

// //  L'ajouter un nouveau tweet
// app.post('/tweets', (req, res) => {
//     const { userId, id, title, body, url, thumbnailUrl, like, repost } = req.body;
//     if (userId && userId) {
//         const newTweet = {
//             userId: userId,
//             id: id,
//             title: title,
//             body: body,
//             url: url,
//             thumbnailUrl: thumbnailUrl,
//             like: like,
//             repost: repost
//         };
//         tweets.push(newTweet);
//         res.status(201).json({ message: 'Tweet ajouté avec succès' });
//     } else {
//         res.status(400).json({ error: 'Données incomplètes' });
//     }
// });

// //Mettre à jouir le tweets
// app.patch('/tweets/:id', (req, res) => {
//     const tweetId = req.params.id;
//     const updatedTweet = req.body;

//     // Recherche du tweet par son ID
//     const tweetIndex = tweets.findIndex(tweet => tweet.userId === tweetId);
//     // res.json({ message: 'Modification', tweet: tweetIndex });
//     if (tweetIndex !== -1) {
//         // Mettre à jour le tweet
//         tweets[tweetIndex] = updatedTweet;
//         res.send('Tweet mis à jour avec succès');
//     } else {
//         res.status(404).send('Tweet non trouvé');
//     }
// });

// // Sppression d'un tweet par son index
// app.delete('/tweets/:id', (req, res) => {
//     const index = req.params.id;
//     if (index > 0 && index < tweets.length) {
//         const deletedTweet = tweets.splice(index - 1, 1);
//         res.json({ message: 'Tweet supprimé avec succès', tweets: deletedTweet });
//     } else {
//         res.status(404).json({ error: 'Index de tweet invalide' });
//     }
// });

