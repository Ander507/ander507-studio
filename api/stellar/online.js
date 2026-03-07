// Online player count endpoint
import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db('stellarclicker');
            const collection = db.collection('sessions');

            // Count users active in last 5 minutes
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            const count = await collection.countDocuments({
                lastSeen: { $gte: fiveMinutesAgo }
            });

            return res.status(200).json({ count });
        } catch (error) {
            console.error('Online count error:', error);
            return res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    if (req.method === 'POST') {
        try {
            // Heartbeat endpoint to track online users
            const { userId } = req.body;
            
            if (!userId) {
                return res.status(400).json({ error: 'User ID required' });
            }

            const client = await clientPromise;
            const db = client.db('stellarclicker');
            const collection = db.collection('sessions');

            await collection.updateOne(
                { userId },
                { 
                    $set: { 
                        userId,
                        lastSeen: new Date()
                    }
                },
                { upsert: true }
            );
            
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Online heartbeat error:', error);
            return res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
