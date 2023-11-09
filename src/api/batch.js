const express = require('express');
const router = express.Router();

const Batch = require('../models/Batch');

router.get('/api/batch', async (req, res) => {
    try {
    const batches = await Batch.find({}, 'batch_year');

    // Extract batch years from the result 
    const batchYears = batches.map((batch) => batch.batch_year);

    res.json({ batchYears });
    } catch (error) {
    console.error('Error fetching batch data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;