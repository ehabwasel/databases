
// I use this way to solve the home work from here  https://github.com/unmeshvrije/database_examples/blob/master/4-db-await.js.

const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'homework_week2',
    port: 3306
};
// drop database and create it then use it
const dropDatabase = `DROP DATABASE IF EXISTS homework_week2`;
const createDatabase = `CREATE DATABASE homework_week2`;
const useDatabase = `USE homework_week2`

const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
        author_no       INT auto_increment PRIMARY KEY,
        author_name     VARCHAR(100) NOT NULL,
        university       VARCHAR(100) NOT NULL,
        date_of_birth    DATE,
        h_index           INT,
        gender          ENUM('m', 'f')
);`;

const ALTER_AUTHORS_TABLE = 

    `ALTER TABLE authors ADD COLUMN mentor INT,
    ADD CONSTRAINT fk_mentor  FOREIGN KEY  (mentor)
    REFERENCES authors(author_no);`;



async function seedDatabase() {

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
    
        await execQuery(dropDatabase);
        await execQuery(createDatabase);
        await execQuery(useDatabase);
        await execQuery(CREATE_AUTHORS_TABLE);
        await execQuery(ALTER_AUTHORS_TABLE);
        connection.end();

    } catch (error) {

        console.error(error.message);
        connection.end();
    } 
}

seedDatabase();