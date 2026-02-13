// Verwende einen Email-Service wie Resend (kostenlos für Vercel)
// Alternativ: Mailgun, SendGrid, oder lokaler SMTP-Server

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

    // Email an den Filmemacher
    const emailToOrganizer = `
      <h2>Neue Ticket-Reservierung für die Premiere</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Anzahl Tickets:</strong> ${tickets}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
      ${message ? `<p><strong>Nachricht:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p><em>Diese Nachricht wurde über die Website-Ticketreservierung gesendet</em></p>
    `;

    // Bestätigungsemail an den Besucher
    const emailToVisitor = `
      <h2>Vielen Dank für deine Ticket-Reservierung!</h2>
      <p>Hallo ${escapeHtml(name)},</p>
      <p>wir haben deine Reservierung für <strong>${tickets} Ticket(s)</strong> zur Kinopremiere erhalten.</p>
      
      <h3>Premiere Details:</h3>
      <ul>
        <li><strong>Datum:</strong> 20. Februar 2026</li>
        <li><strong>Uhrzeit:</strong> 19:30 Uhr</li>
        <li><strong>Ort:</strong> Filmtheater Schauburg Dresden, Königsbrücker Straße 8, 01097 Dresden</li>
        <li><strong>Eintritt:</strong> Auf Spendenbasis</li>
      </ul>
      
      <p>Du wirst in Kürze von uns kontaktiert, um deine Reservierung zu bestätigen und weitere Details zu besprechen.</p>
      
      <p>Viele Grüße,<br>
      Das Team von "Das Ende vom Tellerrand"</p>
      
      <hr>
      <p><small>Diese ist eine automatisch generierte Nachricht. Bitte antworte nicht auf diese Email.</small></p>
    `;

    // OPTION 1: Nutze Resend.com (empfohlen für Vercel)
    // Installiere: npm install resend
    // Setze RESEND_API_KEY in .env.local
    
    // Mit Resend implementieren:
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      // Organisator-Email
      await resend.emails.send({
        from: 'noreply@herrlehmanns-weltreise.de',
        to: 'mail@herrlehmanns-weltreise.de',
        subject: `Neue Ticket-Reservierung: ${name} (${tickets} Tickets)`,
        html: emailToOrganizer
      });

      // Bestätigungs-Email
      await resend.emails.send({
        from: 'noreply@herrlehmanns-weltreise.de',
        to: email,
        subject: 'Ticket-Reservierung erhalten - Das Ende vom Tellerrand',
        html: emailToVisitor
      });

      return res.status(200).json({ 
        success: true, 
        message: 'Ticket-Reservierung erfolgreich versendet!'
      });
    }

    // FALLBACK: Wenn kein Service konfiguriert ist
    console.warn('No email service configured. Please set up RESEND_API_KEY');
    return res.status(500).json({ 
      error: 'Email-Service nicht konfiguriert. Bitte kontaktiere mail@herrlehmanns-weltreise.de direkt.' 
    });

  } catch (error) {
    console.error('Error:', error);
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

