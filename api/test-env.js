// Test-API für Environment Variables
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const hasKey = !!apiKey;
    const keyLength = apiKey ? apiKey.length : 0;
    const keyPrefix = apiKey ? apiKey.substring(0, 5) : 'none';

    // Teste Resend API Verbindung
    let apiTest = 'not tested';
    if (hasKey) {
      try {
        const testResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'noreply@resend.dev',
            to: 'test@example.com',
            subject: 'Test',
            html: '<p>Test</p>'
          })
        });
        apiTest = testResponse.status === 401 ? 'invalid key' : 'valid key';
      } catch (error) {
        apiTest = 'connection error';
      }
    }

    return res.status(200).json({
      environment: {
        hasResendKey: hasKey,
        keyLength: keyLength,
        keyPrefix: keyPrefix,
        apiTest: apiTest
      },
      allEnvVars: Object.keys(process.env).filter(k => k.includes('RES') || k.includes('SEND') || k.includes('API'))
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Test failed',
      details: error.message
    });
  }
}