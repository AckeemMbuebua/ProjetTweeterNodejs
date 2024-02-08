const express = require('express');
const { addTweet, deleteTweet, showTweets } = require('../controllers/postCotrollers');
const router = express.Router();

router.get('/', showTweets);
router.post('/', addTweet);
router.delete('/:index', deleteTweet);
module.exports = router;