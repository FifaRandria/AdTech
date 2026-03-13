# AdTech - Documentation du projet

---

## 1. Architecture du projet

Comme dans une pizzeria :
- Le **client** passe une commande (navigateur)
- Le **serveur** prend la commande et va chercher dans la cuisine (API)
- La **cuisine** stocke et prepare les donnees (MongoDB)

### Ce que fait chaque partie

**Front-end (Next.js)**
- Page 1 : liste des campagnes publicitaires
- Page 2 : formulaire pour créer une campagne
- Page 3 : dashboard avec les statistiques

**Back-end (Node.js + Express)** — Il reçoit les demandes du front, applique les règles métier, et parle à la base de données, avec une architechture MVC, model pour la relation avec la bases de donner, controller pour toute la logique et routes pour bien configurer les endpoints

**Base de données (MongoDB)**

### Les 4 actions disponibles (endpoints)

---

 -  Créer une campagne:  `POST /campaigns` | Ajoute une nouvelle campagne |
 -  Lister les campagnes: `GET /campaigns` | Récupère toutes les campagnes |
 -  Servir une pub: `POST /serve-ad` | Simule l'affichage d'une publicité |
 -  Statistiques: `GET /stats` | Retourne les chiffres globaux |
 
---

## 2. Choix techniques

### TypeScript 

Avec typescript les erreurs sont détectées dans l'éditeur, pas en production devant les utilisateurs.

###  Next.js 
une version améliorée de React qui inclut le routage automatique des pages. Créer le fichier `app/stats/page.tsx`,...

### Pourquoi Tailwind CSS ?
 
Tailwind permet de styliser directement dans le HTML avec des classes courtes. Pas besoin de fichiers CSS séparés pour un projet de cette taille.

## 3. Comment gérer 1 million de requêtes par minute
Actuellement notre système peut tenir quelques centaines de requêtes par minute. Pour monter à 1 million, il faut repenser l'architecture

### Mettre un cache devant la base de données 

Actuellement, on interroge MongoDB. C'est comme demander a la bibliotheque de chercher un livre a chaque fois qu'on veut le lire, même si on l'a deja cherche 1000 fois aujourd'hui.

** utilise Redis par exepmle ** :  Redis est une memoire ultra-rapide. On y stocke les campagnes actives pendant 30 secondes. Si 10 000 requetes arrivent en meme temps, MongoDB n'en voit qu'une seule.

## 4. Comment gérer le capping d'impression

Le capping, une limite qu'on fixe sur le nombre de fois qu'une même publicité est montrée.
 
### Capping de budget (déjà implémenté)
 
On vérifie que `impressionsServed < budget` avant de servir une pub. Quand le budget est epuise, la campagne ne diffuse plus.
 
### Capping par utilisateur (à implémenter)
 
Le but : ne pas montrer la même pub 50 fois au même utilisateur. Pour ça, il faut :
 
**1. Identifier l'utilisateur** avec un identifiant unique (cookie).
**2. Stocker le compteur dans Redis** avec une durée de vie apres on pose
une limite a traver un compteur.

## 5. Comment scaler ce système en production
 
pour faire grandir le système pour supporter plus d'utilisateurs, sans interruption de service.
 
### Infrastructure Cloud (AWS / Google Cloud / Azure, ....)
 
Plutôt que d'acheter des serveurs physiques (coûteux et rigides), on loue de la puissance à la demande dans le cloud (Je connait que la theorie (:)).
