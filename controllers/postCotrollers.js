
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
    const index = req.params.index;
    if (index >= 0 && index < tweets.length) {
        const deletedTweet = tweets.splice(index, 1);
        res.json({ message: 'Tweet supprimé avec succès', tweet: deletedTweet });
    } else {
        res.status(404).json({ error: 'Index de tweet invalide' });
    }
}

function showTweets(req, res) {
    res.json(tweets);
}
module.exports = {
    addTweet,
    showTweets,
    deleteTweet
}