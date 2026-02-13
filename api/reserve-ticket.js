// Reservierungsformular API - Sendet Emails via Resend

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, tickets, phone, message } = req.body;

    // Validierung
    if (!name || !email || !tickets) {
      return res.status(400).json({ error: 'Erforderliche Felder fehlen' });
    }

    if (tickets < 1 || tickets > 10) {
      return res.status(400).json({ error: 'Anzahl der Tickets muss zwischen 1 und 10 liegen' });
    }

    // Überprüfe API Key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('ERROR: RESEND_API_KEY nicht in Umgebungsvariablen gesetzt!');
      console.log('Verfügbare Vars:', Object.keys(process.env).filter(k => k.includes('RES') || k.includes('SEND')));
      return res.status(500).json({ 
        error: 'API-Konfiguration fehlt. Bitte kontaktiere den Administrator.' 
      });
    }

    // HTML für Organisator-Email
    const organizerHtml = `
      <h2>Neue Ticket-Reservierung</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Anzahl Tickets:</strong> ${tickets}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
      ${message ? `<p><strong>Nachricht:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p><em>Diese Nachricht wurde über die Website-Ticketreservierung gesendet</em></p>
    `;

    // HTML für Besucher-Email
    const visitorHtml = `
      <h2>Vielen Dank für deine Ticket-Reservierung!</h2>
      <p>Hallo ${escapeHtml(name)},</p>
      <p>wir haben deine Reservierung für <strong>${tickets} Ticket(s)</strong> zur Kinopremiere erhalten. Du wirst bald von uns kontaktiert.</p>
      
      <h3>Premiere-Details:</h3>
      <ul>
        <li><strong>Datum:</strong> 20. Februar 2026</li>
        <li><strong>Uhrzeit:</strong> 19:30 Uhr</li>
        <li><strong>Ort:</strong> Filmtheater Schauburg Dresden, Königsbrücker Straße 8, 01097 Dresden</li>
        <li><strong>Eintritt:</strong> Auf Spendenbasis</li>
      </ul>
      
      <p>Viele Grüße,<br>
      Das Team von "Das Ende vom Tellerrand"<br>
      <a href="https://www.herrlehmanns-weltreise.de">www.herrlehmanns-weltreise.de</a></p>
    `;

    // Sende Emails via Fetch zu Resend API
    const sendEmail = async (to, subject, html) => {
      const requestBody = {
        from: 'noreply@resend.dev',
        to: to,
        subject: subject,
        html: html
      };

      console.log('Sende Email an:', to);
      console.log('API Key vorhanden:', !!apiKey);

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Resend API Error:', responseData);
        throw new Error(`Resend API error: ${responseData.message || JSON.stringify(responseData)}`);
      }

      console.log('Email erfolgreich versendet:', responseData);
      return responseData;
    };

    // Versende beide Emails
    console.log('Starte Email-Versand...');
    await Promise.all([
      sendEmail('mail@herrlehmanns-weltreise.de', `Neue Ticket-Reservierung: ${name} (${tickets} Tickets)`, organizerHtml),
      sendEmail(email, 'Ticket-Reservierung erhalten - Das Ende vom Tellerrand', visitorHtml)
    ]);

    console.log('Alle Emails versendet!');
    return res.status(200).json({ 
      success: true, 
      message: 'Ticket-Reservierung erfolgreich versendet!'
    });

  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({ 
      error: 'Fehler beim Versenden der Reservierung',
      details: error.message
    });
  }
}

// HTML-Escaping für Sicherheit
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

