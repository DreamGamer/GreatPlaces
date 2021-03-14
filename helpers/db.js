import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS placess (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURI TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);",
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};


export const insertPlace = (title, imageURI, latitude, longitude) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO placess (title, imageURI, latitude, longitude) VALUES (?, ?, ?, ?)",
                [title, imageURI, latitude, longitude],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM placess",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}