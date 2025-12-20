export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { provider, model, prompt, processedFiles } = req.body;

    // Map providers to environment variables
    const apiKeys = {
        'gemini': process.env.GEMINI_API
    };

    const apiKey = apiKeys[provider];

    if (!apiKey) {
        return res.status(500).json({ error: `Server-side API Key for '${provider}' is not configured in Vercel Environment Variables.` });
    }

    try {
        let responseText = '';

        if (provider === 'gemini') {
            responseText = await callGemini(apiKey, model, prompt, processedFiles);
        } else {
            throw new Error('Invalid provider specified.');
        }

        return res.status(200).json({ text: responseText });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

// --- Helper Functions (Ported from client-side) ---

async function callGemini(apiKey, model, prompt, processedFiles) {
    const requestBody = {
        contents: [{
            parts: [
                { text: prompt },
                ...processedFiles.flat()
            ]
        }],
        generationConfig: {
            temperature: 0.4,
        }
    };
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Gemini API request failed.');
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
    }
    throw new Error('No content returned from Gemini API.');
}
