// Update leaderboard entry
import clientPromise from '../../lib/mongodb.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const { userId, username, stellarCoins, totalMined } = req.body;
            
            if (!userId) {
                return res.status(400).json({ error: 'User ID required' });
            }

            const client = await clientPromise;
            const db = client.db('stellarclicker');
            const collection = db.collection('leaderboard');

            await collection.updateOne(
                { userId },
                { 
                    $set: { 
                        userId, 
                        username, 
                        stellarCoins, 
                        totalMined,
                        lastUpdated: new Date()
                    }
                },
                { upsert: true }
            );

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Leaderboard update error:', error);
            return res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
