DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    image_id INT NOT NULL REFERENCES images(id),
    comment TEXT NOT NULL,
    username VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO comments (comment, username, image_id) VALUES (
    'this is my first comment',
    'funkychicken',
    '1'
);
