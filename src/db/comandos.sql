CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)

INSERT INTO user (name) VALUES ('John Doe')

SELECT * FROM user

DROP TABLE user