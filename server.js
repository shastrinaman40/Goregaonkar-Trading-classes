const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'submissions.json');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const SMTP_HOST = process.env.EMAIL_HOST;
const SMTP_PORT = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587;
const SMTP_USER = process.env.EMAIL_USER;
const SMTP_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER;
const EMAIL_TO = process.env.EMAIL_TO;
const EMAIL_ENABLED = SMTP_HOST && SMTP_USER && SMTP_PASS && EMAIL_TO;

let transporter = null;
if (EMAIL_ENABLED) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

async function readSubmissions() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeSubmissions(submissions) {
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf8');
}

async function sendNotificationEmail(submission) {
  if (!transporter) {
    return;
  }

  const subject = `New enrollment: ${submission.name}`;
  const html = `
    <h2>New Enrollment Request</h2>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Phone:</strong> ${submission.phone}</p>
    <p><strong>Class:</strong> ${submission.selected_class}</p>
    <p><strong>Message:</strong> ${submission.message || 'N/A'}</p>
    <p><strong>Submitted at:</strong> ${submission.submitted_at}</p>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject,
    html,
  });
}

app.post('/enroll', async (req, res) => {
  const { name, email, phone, message, selected_class } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).send('Name, email, and phone are required.');
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: (message || '').trim(),
    selected_class: selected_class || 'Not selected',
    submitted_at: new Date().toISOString()
  };

  try {
    const submissions = await readSubmissions();
    submissions.push(submission);
    await writeSubmissions(submissions);
    if (EMAIL_ENABLED) {
      await sendNotificationEmail(submission);
    }
    return res.redirect('/thank-you.html');
  } catch (error) {
    console.error('Error saving submission:', error);
    return res.status(500).send('Unable to save your enrollment request. Please try again later.');
  }
});

app.get('/submissions', async (req, res) => {
  if (!ADMIN_TOKEN) {
    return res.status(403).send('Admin access is not configured.');
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const submissions = await readSubmissions();
    return res.json(submissions);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return res.status(500).send('Unable to load submissions.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
