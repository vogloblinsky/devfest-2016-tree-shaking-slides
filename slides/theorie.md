<!-- .slide: data-background-image="img/loading-time-lrg.jpg" data-background-position="0% 18%" class="darker-overlay"-->
##Contexte

Sur le web, chaque second compte.

exemple du ecommerce :

100 000€ CA / J

délai de 1s ~= 2,5 M€ perte sur l'année

source: [How Loading Time Affects Your Bottom Line](https://blog.kissmetrics.com/loading-time/)

note:
2,3Mo / Doom en 1993
amazon : 100ms de latence, 1% de CA perdu
@@@
<!-- .slide: data-background-image="img/web-app-gap.png" data-background-size="contain" data-background-color="#fff"-->

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

[Angular Universal talk by Wassim Chegham](http://slides.com/wassimchegham/angular2-universal#/8)

@@@
##Pour réduire ce "délai"

- faites un rendu côté serveur (server side rendering)
- lazy loading
- diminuer le poids de vos assets

@@@
###Processus classique de build

<div data-svg-fragment="img/build-process.svg">
  <a class="fragment" title="[*|id=entry-files]"></a>
  <a class="fragment" title="[*|id=concat]"></a>
  <a class="fragment" title="[*|id=min]"></a>
  <a class="fragment" title="[*|id=dce]"></a>
  <a class="fragment" title="[*|id=tree]"></a>
  <a class="fragment" title="[*|id=out-files]"></a>
</div>

@@@
##Un peu de théorie

« Dead code elimination »

versus

« Tree-shaking »

@@@
##Dead code elimination

on part d’un ensemble de lignes de code,

et on enlève ce qu’on peut

&#8594; on "remonte" le code<!-- .element: class="fragment" -->

@@@
##Dead code elimination

```javascript
function test() {
    var a = 24,
        b = 12,
        c;
    c = a + b;
    return c;
    b = 20;
    return;
}
```

Code non atteignable<!-- .element: class="fragment" data-code-focus="7-8" -->

@@@
##Tree-shaking

on prend seulement ce qu’on a besoin, le code vivant

&#8594; il "descend" le code<!-- .element: class="fragment" -->

graphe de dépendance nécessaire<!-- .element: class="fragment" -->

&#8594; "modules" ES6<!-- .element: class="fragment" -->

note:

traces sur le web dès 2013 avec dart2js

@@@
- analyse les modules ES6 "non-utilisés"

<div style="margin-bottom: 90px;"></div>

<div data-svg-fragment="img/tree-shaking-modules.svg">
  <a class="fragment" title="[*|id=out]"></a>
</div>

@@@
- analyse les exports ES6 "non-utilisés"

<div style="margin-bottom: 90px;"></div>

<div data-svg-fragment="img/tree-shaking-exports.svg">
  <a class="fragment" title="[*|id=out]"></a>
</div>

@@@

##et alors, ça revient pas au même ?

non, l’inclusion de "code vivant" est logiquement meilleure<!-- .element: class="fragment" -->

mais il faut penser "modules" de bout en bout<!-- .element: class="fragment" -->

note:
en partant de rien et en ajoutant, bien plus simple que l'inverse.

@@@

##Limites

- ne fonctionne qu'avec des modules ES6 -> structure statique<!-- .element: class="fragment" -->
- ça peut coincer -> analyse de code statique sur un langage "dynamique" ...<!-- .element: class="fragment" -->
    - si changement d'état global par une lib X, le tree-shaking se désactive

note:
- faux positif style lodash

@@@
##Les outils disponibles

| [rollup.js](http://rollupjs.org/) | [Webpack 2](https://webpack.js.org/) |
|:---------:|:---------:|
| ![rollup.js logo](img/rollup.png) | ![webpack logo](img/webpack.png) |

@@@
##Leur coût (overhead)

> Browserify sadness: the more I modularize my code, the bigger it gets.

Nolan Lawson - [Tweet](https://twitter.com/nolanlawson/status/653058308643921920)

> Over 400ms is being spent simply walking the Browserify tree.

Sam Saccone - [Tumblr loading perf](https://docs.google.com/document/d/1E2w0UQ4RhId5cMYsDcdcNwsgL0gP_S6SDv27yi1mCEY/edit)

@@@
##The cost of small modules (Nolan Lawson)

https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/

![](img/cost.jpg)

@@@
##Webpack 2

![webpack logo](img/webpack.png)

créé par [__Tobias Koppers__](https://github.com/sokra)

existe depuis mars 2012

2,5M downloads le dernier mois (npmjs.com)

@@@
##Webpack 2

Tree-shaking toujours en béta (au 09/11/2016)

[![github](img/webpack-2-github-roadmap.png)](https://github.com/webpack/webpack/projects/1)

@@@
##Webpack 2 - How it works ?

- le code est annoté comme "à enlever"

```
/* unused harmony export bar */
var bar = {};
bar.b = 2;
```

- l'option ```--optimize-minimize``` minifie le tout et fait le nettoyage

note:
en 2 fois

@@@
##rollup.js

![rollup.js logo](img/rollup.png)

Créé par [__Rich Harris__](https://github.com/Rich-Harris), développeur du Guardian (Londres)

Existe depuis mai 2015

400 000 downloads le dernier mois (npmjs.com)

@@@
##rollup.js

Tree-shaking : argument marketing n°1

[![website](img/rollup.js.org.png)](http://rollupjs.org/)

@@@
##rollup.js - How it works ?

- il nettoie tout "directement"
