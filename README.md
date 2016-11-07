# devfest-2016-tree-shaking-slides
Slides d'un talk sur le Tree-shaking présenté durant le Devfest Nantes 2016

## Présentation

La formation utilise le framework de présentation web [reveal.js](http://lab.hakim.se/reveal-js/).
Le contenu est stocké dans des fichiers markdown situés dans le dossier slides. Il y a un fichier par chapitre.

Le mode présentateur est disponible après avoir lancé la formation en local avec un serveur apache. Un serveur http/node.js est disponible dans ce dossier.
L'installation et le démarrage se font avec :

```shell
npm install
npm start
```

Les ressources externes, css, js, theme SII sont stockées dans un dépot git installé par npm.

## Raccourcis clavier

F : mode plein écran
S : mode speaker avec notes et timer
Echap : en mode normal, affiche une vue globale des slides

## Build

Exporte une version buildé contenant les ressources SII et vos datas dans une seul dossier

```shell
npm run release
``
