export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const GOFUNDME_URL = 'https://www.gofundme.com/f/auf-der-anderen-seite-des-fernsehers-teil-3';

    console.log('Fetching GoFundMe data from:', GOFUNDME_URL);

    const response = await fetch(GOFUNDME_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Improved regex pattern - sucht nach dem Progress-Muster "€X,XXX raised of €X.XK"
    const progressMatch = html.match(/€([\d,]+)\s+raised\s+of\s+€([\d\.]+)K?/i);

    if (progressMatch) {
      // Parse die Zahlen
      const raised = parseInt(progressMatch[1].replace(/,/g, ''), 10);
      const goalStr = progressMatch[2];
      const goal = goalStr.includes('.')
        ? parseInt((parseFloat(goalStr) * 1000).toString(), 10)
        : parseInt(goalStr, 10) * 1000;

      const percentage = Math.round((raised / goal) * 100);

      console.log('Parsed data:', { raised, goal, percentage });

      res.status(200).json({
        raised,
        goal,
        percentage
      });
    } else {
      throw new Error('Could not parse fundraising data from GoFundMe HTML');
    }
  } catch (error) {
    console.error('Error fetching GoFundMe data:', error);
    // Fallback values
    res.status(200).json({
      raised: 1631,
      goal: 1800,
      percentage: 91
    });
  }
}