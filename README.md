# Adonis API

A simple RESTful API.

| Verb | URL | Action | Check ID | Check fields |
| ---- | --- | ------ | ----------- | --------------- |
| POST | /api/v1/posts | Add a row | No | Yes |
| GET  | /api/v1/posts | Display all rows | No | No |
| GET  | /api/v1/posts/1 | Get a row | Yes | No |
| PUT  | /api/v1/posts/1 | Edit a row | Yes | Yes |
| DELETE | /api/v1/posts/1 | Delete a row | Yes | No |

## Configuration

Create 2 databases (Postgres by default in the package.json), the first for the API and the second for tests.

```sql
CREATE DATABASE adonis_api;
CREATE DATABASE adonis_api_test;
```

Then, edit the ".env" file with `DB_DATABASE=adonis_api` and ".env.tesing" file with `DB_DATABASE=adonis_api`.

Install Adonis to make migrations and running tests.

```bash
$ npm i -g @adonisjs/cli
```

Then make migrations.

```bash
$ adonis migration:run
```

You should have a table like this :

```bash
mysql> describe posts;
+------------+------------------+------+-----+---------+----------------+
| Field      | Type             | Null | Key | Default | Extra          |
+------------+------------------+------+-----+---------+----------------+
| id         | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| title      | varchar(255)     | YES  |     | NULL    |                |
| content    | text             | YES  |     | NULL    |                |
| created_at | datetime         | YES  |     | NULL    |                |
| updated_at | datetime         | YES  |     | NULL    |                |
+------------+------------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
```

## Using API

Running the API server

```bash
cd adonis-api
adonis serve --dev
```

## Units tests

Running tests

```bash
cd adonis-api
adonis test
```
