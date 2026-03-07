// Sign in endpoint
import clientPromise from '../../lib/mongodb.js';
import bcrypt from 'bcryptjs';

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
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password required' });
            }

            const client = await clientPromise;
            const db = client.db('stellarclicker');
            const usersCollection = db.collection('users');

            // Find user
            const user = await usersCollection.findOne({ email: email.toLowerCase() });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Update last login
            await usersCollection.updateOne(
                { userId: user.userId },
                { $set: { lastLogin: new Date() } }
            );

            // Return user (without password)
            const { password: _, ...userWithoutPassword } = user;
            return res.status(200).json({ 
                success: true, 
                user: userWithoutPassword 
            });
        } catch (error) {
            console.error('Signin error:', error);
            return res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}

