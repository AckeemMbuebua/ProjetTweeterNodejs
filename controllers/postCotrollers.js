
let tweets = [];
function addTweet(req, res) {
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
}

function deleteTweet(req, res) {
    const id = Number(req.params.id);
    const index = tweets.findIndex(tweets => tweets.userId === id);
    if (index !== -1) {
        const deletedTweet = tweets.splice(index, 1);
        res.json({ message: 'Tweet supprimé avec succès', tweet: deletedTweet });
    } else {
        res.status(404).json({ error: 'Index de tweet invalide' });
    }
}

function showTweets(req, res) {
    res.json(tweets);
}

function updatedTweet(req, res) {
    const tweetId = Number(req.params.id);
    const updatedTweet = req.body;

    // Recherche du tweet par son ID
    const tweetIndex = tweets.findIndex(tweets => tweets.userId === tweetId);
    if (tweetIndex !== -1) {

        tweets[tweetIndex] = updatedTweet;
        res.send('Tweet mis à jour avec succès');
    } else {
        res.status(404).send('Tweet non trouvé');
        res.json({ message: 'Modification', tweets: tweetIndex });
    }
}
module.exports = {
    addTweet,
    showTweets,
    deleteTweet,
    updatedTweet
}