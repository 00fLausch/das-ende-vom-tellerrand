// Reservierungsformular API - Sendet Emails via Resend

export default async function handler(req, res) {
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

    // Validiere Email-Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Bitte gib eine gültige Email-Adresse ein' });
    }

    // Verwende Resend für Email-Versand
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY nicht gesetzt');
      return res.status(500).json({ 
        error: 'Email-Service nicht konfiguriert. Bitte kontaktiere den Administrator.' 
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
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'noreply@resend.dev',
          to: to,
          subject: subject,
          html: html
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Resend API error: ${error.message || 'Unknown error'}`);
      }

      return response.json();
    };

    // Versende beide Emails
    await Promise.all([
      sendEmail('mail@herrlehmanns-weltreise.de', `Neue Ticket-Reservierung: ${name} (${tickets} Tickets)`, organizerHtml),
      sendEmail(email, 'Ticket-Reservierung erhalten - Das Ende vom Tellerrand', visitorHtml)
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Ticket-Reservierung erfolgreich versendet!'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Fehler beim Versenden der Reservierung',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
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

