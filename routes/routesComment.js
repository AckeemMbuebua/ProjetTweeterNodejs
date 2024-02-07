const express = require('express');
const router = express.Router();

let users = []; // le tableau qui stocke les users

//Pour la récupération et l'affichage de tous les users
router.get('/user', (req, res) => {
    res.json(users);
});

//  L'ajouter un nouveau user
router.post('/user', (req, res) => {
    const { postId, id, name, email, body } = req.body;
    if (id && name) {
        const newUser = {
            postId: postId,
            id: id,
            name: name,
            body: body,
            email: email,
            body: body
        };
        users.push(newUser);
        res.status(201).json({ message: 'Commentaire ajouté' });
    } else {
        res.status(400).json({ error: 'Données incomplètes' });
    }
});

// Suppression d'un tweet par son index
router.delete('/user/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < users.length) {
        const deletedUser = users.splice(index, 1);
        res.json({ message: 'Commentaire supprimé', users: deletedUser });
    } else {
        res.status(404).json({ error: "Impossible de supprimer ce commentaire" });
    }
});

















// {
//     "postId": 1,
//     "id": 1,
//     "name": "id labore ex et quam laborum",
//     "email": "Eliseo@gardner.biz",
//     "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
//   }