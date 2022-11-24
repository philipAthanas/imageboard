const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 8080 } = process.env;
const {
    getImage,
    addImage,
    getSelectedImage,
    getImageComment,
    addImageComment,
} = require("./db");
const { uploader } = require("./middleware");
const fs = require("fs");
const { S3 } = require("./s3");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.get("/image", (req, res) => {
    getImage().then((result) => {
        return res.send(result);
    });
});

app.get("/images", (req, res) => {
    getImage().then((result) => {
        return res.send(result);
    });
});

app.post("/images", uploader.single("photo"), (req, res) => {
    console.log("image in server");
    console.log(req.file);

    console.log(req.body);

    if (req.file) {
        console.log("file is", req.file);

        const { filename, mimetype, size, path } = req.file;

        const promise = S3.putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        }).promise();

        promise
            .then(() => {
                console.log("uploading image: ", req.body);
                addImage({
                    url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
                    username: req.body.username,
                    title: req.body.title,
                    description: req.body.description,
                })
                    .then((result) => {
                        // wichtig!!! Parameter
                        //if successfully added to database, write json for img fetch in app.js
                        res.json({
                            success: true,
                            message: "File upload successful",
                            url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
                            description: req.body.description,
                            title: req.body.title,
                            username: req.body.username,
                        });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({
            success: false,
            message: "File upload failed",
        });
    }
});

// modal
app.get("/modal/:id", (req, res) => {
    if (req.params.id) {
        getSelectedImage(req.params.id).then((result) => {
            console.log(result);
            return res.send(result);
        });
    }
});

// comment
app.get("/comment/:id", (req, res) => {
    if (req.params.id) {
        getImageComment(req.params.id).then((result) => {
            console.log("comments are ", result);
            return res.send(result);
        });
    }
});

app.post("/comment/:id", (req, res) => {
    console.log("comment: ", req.body);
    if (req.body) {
        addImageComment({
            comment: req.body.comment,
            username: req.body.username,
            image_id: req.params.id,
        }).then((result) => {
            return res.json({
                comment: result.comment,
                username: result.username,
                image_id: result.image_id,
                id: result.id,
            });
        });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`));

// uploading to https://s3.amazonaws.com/spicedling/gLAsKAd_hTzlSSm2sVEkZU41xOdcb3fY.JPG' is working!
