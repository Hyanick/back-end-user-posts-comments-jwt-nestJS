<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
## Lien vers la vidéo *** https://www.youtube.com/watch?v=QPLaYMh8bdw ***
## I-  SIGNUP
  # I-1 
    $ 1- pour crypter le mot de passe du user: npm i bcript et npm i @types/bcript
  # I-2 Pour envoyer les mails, utiliser un serveur de mail
    1- npm i nodemailer  npm i -D @types/nodemailer
    2- pour l'exécutable : Mailer hog github: https://github.com/mailhog/MailHog/releases/v1.0.0

## II- Pour la partie signin (Au niveau du token JWT)
  1- npm i --save @nestjs/jwt passport-jwt et npm i --save-dev @types/passport-jwt 

## III- Reset Password
  1- npm i speakeasy et npm i -D @types/speakeasy : pour générer des codes automatiquement

## IV- Suppression de compte
  1- Il faut une route sécurisée par un token valide: Il faut installer un package qui permet de décrypter un token jwt
      -- npm install --save @nestjs/passport passport et npm install --save-dev @types/passport-local

## V - Partie documentation: Swagger
- npm install --save @nestjs/swagger 
- Rajouter la configuration dans le fichier main.ts
- Pour séparer les différents controleur, on peut ajouter le décorateur "@ApiTags('nom_controlleur')"
- Pour afficher les propriètes des dto, on a 2 possibilités:
    - Rajouter '@ApiProperty()' au niveau de chaque propriété du DTO
    - Ou rajouter ceci:   "plugins": ["@nestjs/swagger"] au niveau de l'objet "compilerOptions" du fichier nest-cli.json
    - NB: 
        - il faut au prélable que le dto soient bien nommés, exple: signin.dto.ts
        - Penser également à arrêter le serveur et supprimer le dossier "dist" et relancer le serveur après

- Pour spécifier visuellement qu'un(e) controller/méthode est protégé, il faut rajouter le décorateur "@ApiBearerAuth()" soit au niveau du controlleur ou au niveau de la méthode

## *************************** TIPS ******************************
En cas de problème lors de la modification du schéma prisma avec les erreurs suivantes:
- The table `(not available)` does not exist in the current database.
- The column `(not available)` does not exist in the current database.

faire un 'npx prisma migrate dev et npx prisma db push' avec le serveur arrêté