'use client';

const FileUploadPage = () => {
  return (
    <div className="p-6 ml-80 mt-30 ">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Node.js File Upload</h1>
        <p className="text-lg">
          File uploading in Node.js is commonly handled using third-party middleware like <code>multer</code>. It helps process <code>multipart/form-data</code>, which is used for uploading files.
        </p>

        <h2 className="text-2xl font-semibold">📦 Step 1: Install <code>multer</code></h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>npm install multer</code>
        </pre>

        <h2 className="text-2xl font-semibold">📁 Step 2: Create an Upload Endpoint</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          <code>
{`const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // upload destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('myfile'), (req, res) => {
  res.send('File uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold">🧪 Testing the Upload</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use tools like Postman or HTML forms with <code>enctype="multipart/form-data"</code>.</li>
          <li>The uploaded file will be stored in the <code>uploads/</code> directory.</li>
        </ul>

        <h2 className="text-2xl font-semibold">📌 Summary</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use <code>multer</code> to handle file uploads in Node.js with Express.</li>
          <li>Configure a storage destination and naming strategy.</li>
          <li>Support both single and multiple file uploads.</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadPage;
