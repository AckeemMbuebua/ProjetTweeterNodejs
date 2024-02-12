const express = require('express');
const { addTweet, deleteTweet, showTweets, updatedTweet, liked } = require('../controllers/postCotrollers.js');
const router = express.Router();

router.get('/', showTweets);
router.post('/', addTweet);
router.delete('/:id', deleteTweet);
router.patch('/:id', updatedTweet);
router.put('/:id', liked);
module.exports = router;