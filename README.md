<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p> <p align="center">A scalable <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and enterprise-ready server-side applications.</p> <p align="center"> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a> <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a> <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a> <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a> <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a> <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a> <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a> <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a> </p>

# Description

This is a NestJS application built with Docker, providing a Postgres database integration and a RESTful API. It includes a development environment for building and testing server-side applications efficiently.
Project Setup
Prerequisites

Make sure you have Docker and Docker Compose installed on your system:

    Docker
    Docker Compose

Steps to setup and run

   -  Clone the Repository

   -  Go to cloned directory
     
   -  set your environment variable
     
   -  spin up the docker containers using docker-compose.yml

    # clone the repository
    git clone https://github.com/ankitmr27/cloud-sek-assignment.git
    
    # change the directory
    cd cloud-sek-assignment

    # setup environment variables according to .env.example file  (kept it filled in docker-compose.yml for ease of setup for user)
    
    # spin up the containers
    docker compose up -d

This will build and run the application with a PostgreSQL database on port 5432 and the NestJS app on port 3000.

#  Access the Application
    Application: http://localhost:3000/api
    Swagger API Documentation: http://localhost:3000/docs

You can modify these values as needed in the docker-compose.yml.
# Stopping the Application

To stop the running services, run:

    bash
    
    docker compose down

Rebuilding the Application

If you make any changes to the code or environment, rebuild the containers:

    bash
    
    docker-compose up --build

# Persistent Data

The PostgreSQL database data is persisted using Docker volumes. To retain data across restarts, the volume is mounted as defined in the docker-compose.yml:

yaml

volumes:
pgdata:
driver: local

Compile and Run the Project

# To start the NestJS application without Docker:

    # install all dependencies from packaga.json file
    npm install

# development mode

    npm run start

# watch mode

    npm run start:dev

# production mode

    npm run start:prod

Stay in Touch

    Author - Ankit Maurya
    Linkedlin - https://www.linkedin.com/in/ankit-maurya-a094121ba/

License

Nest is MIT licensed.
