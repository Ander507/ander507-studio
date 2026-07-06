export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message, website } = req.body || {};

    if (website) {
        return res.status(200).json({ success: true });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (message.trim().length > 5000) {
        return res.status(400).json({ error: 'Message is too long (max 5000 characters).' });
    }

    const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
        return res.status(500).json({ error: 'Contact form is not configured yet.' });
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title: subject?.trim() ? `Contact: ${subject.trim()}` : 'New contact message',
                    color: 0xec4899,
                    fields: [
                        { name: 'Name', value: name.trim().slice(0, 256), inline: true },
                        { name: 'Email', value: email.trim().slice(0, 256), inline: true },
                        { name: 'Message', value: message.trim().slice(0, 4000) },
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: 'ander507.dev contact form' },
                }],
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to deliver message');
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}
