# processus d'installation et de lancement en local

## front end (next + tailwind)

 - npx create-next-app@latest frontend
 - cocher les question que pose les CLI

```
Would you like to use TypeScript? → Yes,
Would you like to use ESLint? → Yes,
Would you like to use Tailwind CSS? → Yes,...
```

cd frontend

npm run dev

http://localhost:3000


## backend (node Express.js)

 - npm init -y
 - npm install express cors dotenv
 - npm install -D nodemon

 http://localhost:5000

## bases de donnees
 - MomgoDB  devrait etre installe localement
 - node.js v20+
 - Fichier back/.env avec MONGO_URI=mongodb://localhost:27017/adCampaignDB
 example du fichier .env :
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/nom_de_la_base


## petit resume

Pour lancer le projet, il faut :
1. Installer Node.js
2. Installer MongoDB
3. Configurer le `.env`
4. Lancer le back dans un terminal
5. Lancer le front dans un autre terminal