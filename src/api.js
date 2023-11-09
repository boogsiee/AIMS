const express = require('express');
const db = require('./db'); // Adjust the path based on your project structure

const router = express.Router();

router.get('/batch', (req, res) => {
    db.all('SELECT * FROM Batch', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});


router.get('/posts', (req, res) => {
    db.all('SELECT * FROM Posts', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});


router.get('/sections', (req, res) => {
    db.all('SELECT * FROM Sections', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});

router.get('/strands', (req, res) => {
    db.all('SELECT * FROM Strands', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});


router.get('/users', (req, res) => {
    db.all('SELECT * FROM User', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});

router.get('/user-types', (req, res) => {
    db.all('SELECT * FROM UserType', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});

router.get('/image-attributes', (req, res) => {
    db.all('SELECT * FROM ImageAttributes', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});

router.get('/images', (req, res) => {
    db.all('SELECT * FROM Images', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});
module.exports = router;

