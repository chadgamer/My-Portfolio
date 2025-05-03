// filepath: server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configure your email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'papamclester@gmail.com', 
            pass: 'febkwupoyuoxm​​ttg', 
        },
    });

    const mailOptions = {
        from: email,
        to: 'papamclester@gmail.com', 
        subject: `New Message from ${name}: ${subject}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error); // Log the full error
        res.status(500).send('Failed to send email.');
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));