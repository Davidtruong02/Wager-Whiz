const express = require('express');
const router = express.Router();
const { fetchDataFromAWS } = require('../utils/apiCalls');

router.get('/fetchAWSData', async (req, res) => {
    try {
        await fetchDataFromAWS();
        res.status(200).send("Data successfully fetched and stored.");
    } catch (error) {
        res.status(500).send("Error fetching data: " + error.message);
    }
});

module.exports = router;
