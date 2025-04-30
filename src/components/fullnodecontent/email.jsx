'use client';

const EmailModulePage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-black space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 ml-10">
        <h1 className="text-4xl font-bold">Node.js Email Module</h1>
        <p className="text-lg">
          Node.js doesn't have a built-in email module, but you can use third-party modules like <code>nodemailer</code> to send emails from your application.
        </p>

        <h2 className="text-2xl font-semibold">Installing Nodemailer</h2>
        <p className="text-lg">Use npm to install the <code>nodemailer</code> package:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>npm install nodemailer</code>
        </pre>

        <h2 className="text-2xl font-semibold">Sending an Email</h2>
        <p className="text-lg">Here's a basic example of sending an email using Nodemailer and Gmail:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const nodemailer = require('nodemailer');

// Create a transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password_or_app_password',
  },
});

// Email options
const mailOptions = {
  from: 'your_email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Test Email from Node.js',
  text: 'Hello! This email was sent from Node.js using Nodemailer.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});`}
          </code>
        </pre>
        <p className="text-sm text-red-600">
          ⚠️ For Gmail, you may need to enable "Less secure app access" or use an App Password if 2FA is enabled.
        </p>

        <h2 className="text-2xl font-semibold">Using HTML Content</h2>
        <p className="text-lg">You can also send rich HTML emails:</p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const mailOptions = {
  from: 'your_email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Welcome Email',
  html: '<h1>Welcome!</h1><p>This is an HTML email from Node.js.</p>',
};`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">📦 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use <code>nodemailer</code> to send emails in Node.js.</li>
          <li>Create a transporter with your email service and credentials.</li>
          <li>Configure mail options including <code>from</code>, <code>to</code>, <code>subject</code>, and <code>text</code> or <code>html</code>.</li>
          <li>Call <code>transporter.sendMail()</code> to send the email.</li>
          <li>Use App Passwords or service-specific configuration to avoid login errors.</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailModulePage;
