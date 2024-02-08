const express = require('express');
const router = express.Router();

let users = []; // le tableau qui stocke les users

//Pour la récupération et l'affichage de tous les users
router.get('/user', (req, res) => {
    res.json(users);
});

//  L'ajouter un nouveau user
router.post('/user', (req, res) => {
    const { id, name, username, email, profil, thumbnailProfil, Joined } = req.body;
    if (id && name) {
        const newUser = {
            id: id,
            name: name,
            username: username,
            body: body,
            email: email,
            profil: profil,
            thumbnailProfil: thumbnailProfil,
            Joined: Joined
        };
        users.push(newUser);
        res.status(201).json({ message: 'Inscription réalisée avec succès' });
    } else {
        res.status(400).json({ error: 'Données incomplètes' });
    }
});

// Suppression d'un tweet par son index
router.delete('/user/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < users.length) {
        const deletedUser = users.splice(index, 1);
        res.json({ message: 'Utilisateur supprimé avec succès', users: deletedUser });
    } else {
        res.status(404).json({ error: "id de l'utilisateur invalide" });
    }
});

module.exports = router
