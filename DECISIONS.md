# DECISION.md — Arbitrages, erreurs et améliorations


## 1. Erreurs rencontrées

### Erreur de configuration TypeScript — `Cannot find module './server.ts'`
 
**Ce qui s'est passé :**
Au démarrage du projet, `ts-node` ne trouvait pas le fichier `server.ts` car le `tsconfig.json` pointait vers un dossier `src/` qui n'existait pas.

### Erreur silencieuse — `import { console } from "node:inspector"`
 
**Ce qui s'est passé :**
Le serveur démarrait sans afficher aucun message (`MongoDB connected`, `Server running on port 5000`). Pas d'erreur visible, juste le silence.

Une importation avait écrasé le `console` natif de Node.js par une version interne qui n'affiche rien dans le terminal.

## 2. Arbitrages techniques

### `/serve-ad` — Que faire quand plusieurs campagnes sont éligibles ?
**Le problème :**
Quand on appelle `POST /serve-ad` avec `{ "country": "FR" }`, il peut exister 5 campagnes actives qui ciblent la France, ont une date valide et un budget disponible. Laquelle choisir ?

**Choix retenu dans ce projet :** première campagne trouvée (`findOne`), car c'est la version la plus simple à lire et à maintenir pour le moment.

### `impressionsServed` vs coût réel d'une impression

**Le problème :**
Dans l'implémentation actuelle, on compare :
```
impressionsServed < budget
```
Cela suppose qu'une impression coûte exactement **1 unité de budget**. En réalité, le coût d'une impression publicitaire dépend du modèle tarifaire

**Choix retenu :** on simplifie en considérant que `1 impression = 1 unité de budget`. C'est faux dans la réalité mais suffisant pour illustrer le mécanisme.

## 3. Ce qu'on aurait amélioré avec plus de temps
### Dockerisation du projet
 
**Le problème actuel :**
Pour lancer le projet, il faut :
1. Installer Node.js
2. Installer MongoDB
3. Configurer le `.env`
4. Lancer le back dans un terminal
5. Lancer le front dans un autre terminal
 
C'est long, fragile ("ça marche sur ma machine") et difficile à partager.
 
**La solution — Docker :**
Docker permet d'empaqueter l'application et toutes ses dépendances dans des "conteneurs" isolés. 

### Ajout de Redis pour le capping et les performances
 
**Cache des campagnes actives** — au lieu d'interroger MongoDB à chaque requête `/serve-ad`, on stocke les campagnes éligibles dans Redis pendant 30 secondes. 1000 requêtes simultanées ne font qu'une seule requête à MongoDB.