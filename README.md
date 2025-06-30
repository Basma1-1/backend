# Travly - Partie Backend

 C'est le backend de l’application 'Travly', une plateforme qui permet de planifier des voyages.

# Description

Cette partie contient tout le code nécessaire pour gérer :
- le frontend utilisateur
- le frontend administrateur
Elle fournit les API permettant :
- la gestion des utilisateurs
- la gestion des voyages
- la gestion des réservations
- la gestion des paiements
- la génération de documents PDF
- la gestion des notifications

## Technologies utilisées

- Node.js
- Express.js
- Sequelize
- MySQL 
- JWT (pour l’authentification)
- Multer (pour l’upload de fichiers)
- PDFKit (pour générer les PDF)

## Installation

1. Cloner le projet :
    git clone https://github.com/Basma1-1/backend.git

2. Installer les dépendances :
    npm install

3. Lancer le serveur :
    npm start

## Structure du projet
- config/ : Configurations diverses
- controllers/ : Gestion des requêtes HTTP
- routes/ : Définition des routes API
- models/ : Définition des modèles de données
- middlewares/ :  Authentification, vérifications
- utils/ : génération PDF


