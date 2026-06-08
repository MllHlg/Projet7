<p align="center">
   <img src="./front/src/favicon.png" width="192px" />
</p>

# MicroCRM (P7 - Développeur Full-Stack - Java et Angular - Mettez en œuvre l'intégration et le déploiement continu d'une application Full-Stack)

MicroCRM est une application de démonstration basique ayant pour être objectif de servir de socle pour le module "P7 - Développeur Full-Stack".

L'application MicroCRM est une implémentation simplifiée d'un ["CRM" (Customer Relationship Management)](https://fr.wikipedia.org/wiki/Gestion_de_la_relation_client). Les fonctionnalités sont limitées à la création, édition et la visualisations des individus liés à des organisations.

![Page d'accueil](./misc/screenshots/screenshot_1.png)
![Édition de la fiche d'un individu](./misc/screenshots/screenshot_2.png)

## Code source

### Organisation

* **Architecture séparée :** Un front-end Angular 17 et une API REST en Java Spring Boot 3.
* **Conteneurisation :** Utilisation de *multi-stage builds* Docker pour optimiser le poids des images, gérées via Docker Compose.
* **CI/CD :** Pipeline automatisé via GitHub Actions assurant les tests, l'analyse qualité et le déploiement sur le GitHub Container Registry.
* **Qualité & Sécurité :** Analyse intégrée au pipeline via SonarQube Cloud.
* **Monitoring :** Centralisation des logs via la stack ELK (Elasticsearch, Logstash, Kibana).

### Démarrer via Docker (recommandé)

Un fichier `docker-compose.yml` est disponible pour lancer simultanément le client et le serveur.

Exécutez la commande suivante à la racine du projet :

```shell
docker-compose up -d
```

Le côté client de l'application sera disponible sur https://localhost et l'API sera disponible sur http://localhost:8080.

### Démarrer avec les sources

#### Serveur

##### Dépendances

- [OpenJDK >= 17](https://openjdk.org/)

##### Procédure

1. Se positionner dans le répertoire `back` avec une invite de commande:

   ```shell
   cd back
   ```

2. Construire le JAR:

   ```shell
   # Sur Linux
   ./gradlew build

   # Sur Windows
   gradlew.bat build
   ```

3. Démarrer le service:

   ```shell
   java -jar build/libs/microcrm-0.0.1-SNAPSHOT.jar
   ```

Puis ouvrir l'URL http://localhost:8080 dans votre navigateur.

#### Client

##### Dépendances

- [NPM >= 10.2.4](https://www.npmjs.com/)

##### Procédure

1. Se positionner dans le répertoire `front` avec une invite de commande:

   ```shell
   cd front
   ```

2. (La première fois seulement) Installer les dépendances NodeJS:

   ```shell
   npm install
   ```

3. Démarrer le service de développement:

   ```shell
   npx @angular/cli serve
   ```

Puis ouvrir l'URL http://localhost:4200 dans votre navigateur.

### Exécution des tests

#### Client

**Dépendances**

- Google Chrome ou Chromium

Dans votre terminal:

```shell
cd front
CHROME_BIN=</path/to/google/chrome> npm test
```

#### Serveur

Dans votre terminal:

```shell
cd back
./gradlew test
```

### Intégration et déploiement continue (CI/CD)

Ce projet utilise GitHub Actions pour automatiser les tests, l'analyse de code, la création d'images Docker et la gestion des versions. Le pipeline (fichier .github/workflows/ci.yml) se déclenche à chaque `push` ou `pull_request`.

Le workflow est divisé en plusieurs jobs :

1. **Tests :** 
   - Automatisation de l'exécution des tests du front et du back grâce au script `run-tests.sh`
   - Analyse de la qualité du code front et back avec **SonarQube**.
   - Sauvegarde des rapports de tests sous forme d'artefacts GitHub.

2. **Build :**
   - Déclenché lors d'une mise à jour sur la branche `main`.
   - Construction des images Docker.
   - Stockage des images sur le GitHub Container Registry avec le tag lié au commit et le tag `latest`.

3. **Release :**
   - Déclenchée sur la branche `main` si les étapes de build réussissent.
   - Utilisation de l'outil `semantic-release` pour gérer le versioning du projet basé sur l'historique des commits.
  
### Centralisation des logs (Stack ELK)

Le projet intègre la stack ELK (Elasticsearch, Logstash, Kibana) pour l'analyse des logs en temps réel.

Pour démarrer l'environnement ELK de manière isolée :
```shell
docker-compose -f docker-compose-elk.yml up -d
```

L'interface de visualisation est accessible sur http://localhost:5601.
