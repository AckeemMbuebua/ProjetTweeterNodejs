const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { privateKey, publicKey } = require('../model/otherfunctions');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const users = [];
async function createUser(req, res) {
    const { name, username, email, profil, thumbnailProfil, password } = req.body;

    const Emailuser = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (name && email && password) {
        bcrypt.hash(String(password), 5, function (err, bcryptPassword) {
            if (!Emailuser) {
                async function add() {
                    const user = await prisma.users.create({
                        data: {
                            name: name,
                            username: username,
                            email: email,
                            profil: profil,
                            thumbnailProfil: thumbnailProfil,
                            password: bcryptPassword
                        }
                    });
                }
                add();
                const token = jwt.sign({ email }, privateKey, { algorithm: 'RS256' })
                res.status(201).json({
                    message: 'Inscription réalisée avec succès',
                    err: "Votre jeton est: " + token
                });
            } else {
                res.status(400).json({ error: 'utilisateur existant' });
            }
        })

    } else {
        res.status(400).json({ error: 'Données incomplètes, remplissez tous les champs' });
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

async function showUsers(req, res) {
    const users = await prisma.users.findMany();
    res.send(users);
    // res.send(req.userToken);
}

async function loginUsers(req, res) {
    const { email, password } = req.body;
    const users = await prisma.users.findMany();
    const verifed = users.some((users) => users.email == email && users.password === password)
    const token = jwt.sign({ email }, privateKey, { algorithm: 'RS256' })
    if (verifed) {
        res.send(token)
    } else {
        res.status(404).json("Utilisateur inconnu")
    }
}

module.exports = {
    createUser, deletedUser, showUsers, loginUsers, jwtSecurity
}