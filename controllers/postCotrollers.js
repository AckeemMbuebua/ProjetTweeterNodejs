
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let tweets = [];
function addTweet(req, res) {
    const { idUser, title, body, image } = req.body;
    if (idUser && body) {
        async function addTwt() {
            const tweets = await prisma.tweets.create({
                data: {
                    idUser: idUser,
                    title: title,
                    body: body,
                    image: image
                }
            });
            console.log(tweets);
        }
        addTwt();
        tweets.push(tweets);
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

async function showTweets(req, res) {
    const allTweets = await prisma.tweets.findMany();
    res.json(allTweets);
    console.log(allTweets);
}

async function updatedTweet(req, res) {

    const { name, username, profil, thumbnailProfil } = req.body
    const updateTweets = await prisma.tweets.update({
        where: {
            email: email,
        },
        data: {
            name: name,
            username: username,
            profil: profil,
            thumbnailProfil: thumbnailProfil
        }
    })


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

function liked(req, res) {
    const idPost = Number(req.body.idPost);
    // const tweetIndex = tweets.findIndex(tweets => tweets.userId === tweetId);
    const indexPost = tweets.findIndex(tweets => tweets.userId === idPost);
    const tweetIndex = tweets.findIndex(tweets => tweets.userId === idPost);

    if (indexPost !== -1) {
        if (tweetLike[tweetIndex].like == null) {
            tweets[tweetIndex].like = true;
            res.json(tweets[tweetIndex]);
        } else {
            tweets[tweetIndex].like = false;
            res.json({ message: 'Like modifier', tweet: tweets[tweetIndex] });
        }
    } else {
        res.status(404).send('id introuvable');
        // res.json({ message: 'Modification', tweets: tweetIndex });
    }
}

function retweets(req, res) {

}
module.exports = {
    addTweet,
    showTweets,
    deleteTweet,
    updatedTweet,
    liked
}