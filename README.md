# ProjektseminarE-Business

Tower Defense Game in JavaScript

# GitHub Nutzung

Projekt runterladen:

1. Konsole im gewünschten Verzeichnis öffnen
2. GitHub Link zum klonen kopieren
3. `git clone "link"` in Konsole ausführen

Eigene Branch erstellen: \
`git branch "name"` \
In eigene Branch wechseln: \
`git checkout "name"` \
Veränderungen hochladen: \
`git commit -m "Beschreibung"` \
`git add .` \
Veränderungen pushen: \
`git push origin "branch name"`

# Abhängigkeiten für Bwoserify installieren

1. NodeJS auf https://nodejs.org/en/ herunterladen — dadurch installiert man den
   Befehl npm fürs Terminal
2. `npm install -g browserify`
3. `cd js-classes`
4. `npm install`
5. `browserify game.js -o bundle.js`

# Watchify

1. `npm install -g watchify`
2. `cd js-classes
3. `npm install`
4. `watchify game.js -o bundle.js -v`
