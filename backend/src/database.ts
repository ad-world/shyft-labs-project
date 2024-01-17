import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'

let sql = `
CREATE TABLE IF NOT EXISTS students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dob TEXT
);

CREATE TABLE IF NOT EXISTS courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_name TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS results (
    result_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    score TEXT NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);
`;

// Create tables if they don't exist
const initDb = async () => {
    const db = await open({
        driver: sqlite3.Database,
        filename:'./database.db',
    });

    try {
        await db.run(sql);
    } catch (err) {
        console.log(err);
    }
}

initDb();

/**
 * Retrieves the database connection.
 * @returns {Promise<Database<sqlite3.Database, sqlite3.Statement>>} The database connection.
 */
export const getDb = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
    const db = await open({
        driver: sqlite3.Database,
        filename:'./database.db',
    })

    return db;
}