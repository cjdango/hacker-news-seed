# Hacker News Top 500 stories database seed

This project fetches the top 500 stories from [hackernews API](https://github.com/HackerNews/API) and store them and their descendants to a postgreSQL database.


## Install Prerequisites

 - [Docker Engine](https://docs.docker.com/engine/install/)
 - [Docker Compose](https://docs.docker.com/compose/install/)

## Usage
Clone this repository

    $ git clone https://github.com/cjdango/hacker-news-seed
cd into the directory and install dependencies

    $ cd hacker-news-seed && npm install

Start the postgreSQL server through docker

    $ DB_USER=<your_username> DB_NAME=<your_database_name> DB_PASSWORD=<your_database_password> docker-compose up -d

Create a `.env` file in the root directory of this repository with the following environment variables (needed before starting the actual program)

    PGUSER=<your_username>
    PGPASSWORD=<your_database_name>
    PGDATABASE=<your_database_password>

Start the app to create and seed your database with top 500 stories

    $ npm start

You can connect with the postgresSQL server via port `5432` to send a query to the database and do what you want with it

    $ docker-compose exec postgres psql -U <your_username> -d <your_database_name>

## Features

 - [x] Fetches all items and their descendants asynchronously
 - [x] Inserts into the database asynchronously
 - [x] Skips on null items
 - [x] Skips on failed http request. e.g. connection error
 - [x] Retry failed http requests 3 times before skipping
 - [x] Logs in terminal and generates a `log.txt` file
