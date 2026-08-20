// api/stock-query.js
// Grace's serverless endpoint reads from Genesis's local cache directly.
const { localDatabaseCache } = require('../database.js');

module.exports = async (req, res) => {
    // 1. Enforce HTTP GET method
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            error: 'Method Not Allowed. Send GET.' 
        });
    }

    // 2. Add response headers for CORS and prevent caching stale stock data
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    // 3. Extract and validate itemId parameter
    const { itemId } = req.query;

    if (!itemId || typeof itemId !== 'string' || itemId.trim() === '') {
        return res.status(400).json({ 
            error: 'Bad Request. Missing or invalid required query parameter: itemId.' 
        });
    }

    const cleanItemId = itemId.trim();

    // 4. Cache lookup
    const cachedItem = localDatabaseCache[cleanItemId];

    if (!cachedItem) {
        return res.status(404).json({ 
            error: `Item '${cleanItemId}' not found in local sync cache.` 
        });
    }

    // 5. Return success response
    return res.status(200).json({ 
        itemId: cleanItemId, 
        cachedData: cachedItem 
    });
};
