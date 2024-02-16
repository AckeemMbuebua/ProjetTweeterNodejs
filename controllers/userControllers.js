const jwt = require('jsonwebtoken');
const { privateKey, publicKey } = require('../model/otherfunctions');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.users.findMany();
    console.log(users);
}

main();



const users = [];
function createUser(req, res) {
    const { name, username, email, profil, thumbnailProfil, password } = req.body;
    // const Joined = '';
    if (name && email && password) {
        async function add() {
            const user = await prisma.users.create({
                data: {
                    name: name,
                    username: username,
                    email: email,
                    profil: profil,
                    thumbnailProfil: thumbnailProfil,
                    password: String(password)
                    // joined: Joined
                }
            });
            console.log(user);
        }

        add();
        users.push(add);
        const token = jwt.sign({ email }, privateKey, { algorithm: 'RS256' })
        res.status(201).json({
            message: 'Inscription réalisée avec succès',
            err: "Votre jeton est: " + token
        });
    } else {
        res.status(400).json({ error: 'Données incomplètes' });
    }
}

function jwtSecurity(req, res, next) {
    const idToken = req.headers.authorization;
    jwt.verify(idToken, publicKey, (err, decoded) => {
        if (err) {
            res.status(404).send('Non autorisé')
        } else {
            req.userToken = decoded;
            next();
        }
    })
}

function deletedUser(req, res) {
    const id = Number(req.params.idUser);
    const index = users.findIndex(users => users.id === id);
    if (index !== -1) {
        const deleteduser = users.splice(index, 1);
        res.json({ message: 'Utilisateur supprimé avec succès', user: deleteduser });
    } else {
        res.status(404).json({ error: "id de l'utilisateur invalide" });
    }
}

function showUsers(req, res) {
    res.send(req.userToken);
}

function loginUsers(req, res) {
    const { email, password } = req.body;
    const verifed = users.some((users) => users.email == email && users.password === password)
    const token = jwt.sign({ email }, privateKey, { algorithm: 'RS256' })
    if (verifed) {
        res.send(token)
    } else {
        res.status(404).send("Utilisateur inconnu")
    }
}

module.exports = {
    createUser, deletedUser, showUsers, loginUsers, jwtSecurity
}