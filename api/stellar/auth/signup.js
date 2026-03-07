// Sign up endpoint
import clientPromise from '../../lib/mongodb.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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

            if (password.length < 6) {
                return res.status(400).json({ error: 'Password must be at least 6 characters' });
            }

            const client = await clientPromise;
            const db = client.db('stellarclicker');
            const usersCollection = db.collection('users');

            // Check if user already exists
            const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Generate user ID
            const userId = crypto.randomBytes(16).toString('hex');

            // Create user
            const user = {
                userId,
                email: email.toLowerCase(),
                password: hashedPassword,
                username: email.split('@')[0],
                createdAt: new Date(),
                lastLogin: new Date()
            };

            await usersCollection.insertOne(user);

            // Create initial game state
            const gameStateCollection = db.collection('gameStates');
            await gameStateCollection.insertOne({
                userId,
                gameState: {
                    stellarCoins: 0,
                    coinsPerClick: 1,
                    coinsPerSecond: 0,
                    totalMined: 0,
                    upgrades: {},
                    skills: {},
                    achievements: {}
                },
                lastUpdated: new Date()
            });

            // Return user (without password)
            const { password: _, ...userWithoutPassword } = user;
            return res.status(200).json({ 
                success: true, 
                user: userWithoutPassword 
            });
        } catch (error) {
            console.error('Signup error:', error);
            return res.status(500).json({ error: error.message || 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}

