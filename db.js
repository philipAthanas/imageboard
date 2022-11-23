const spicedPg = require("spiced-pg");
require("dotenv").config();

const db = spicedPg(
    `postgres:${process.env.USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`
);

module.exports.getImage = () => {
    return db.query("SELECT * FROM images").then((result) => result.rows);
};

// saving images
module.exports.addImage = ({ url, username, title, description }) => {
    return db
        .query(
            `INSERT INTO images ("url", "username", "title", "description")
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
            [url, username, title, description]
        )
        .then((result) => result.rows[0]);
};

// modal
module.exports.getSelectedImage = (id) => {
    return db
        .query("SELECT * FROM images WHERE id=$1", [id])
        .then((result) => result.rows[0]);
};

module.exports.getImageComment = (id) => {
    return db
        .query(`SELECT * FROM comments WHERE image_id=$1`, [id])
        .then((result) => result.rows);
};

module.exports.addImageComment = ({ comment, username, image_id }) => {
    return db
        .query(
            `INSERT INTO comments (comment, username, image_id) VALUES ( $1, $2, $3 )
        RETURNING *`,
            [comment, username, image_id]
        )
        .then((result) => result.rows[0]);
};
