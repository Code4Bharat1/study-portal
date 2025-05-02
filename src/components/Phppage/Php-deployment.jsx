'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function PhpDeployment() {
  useReadingTracker('php-deployment');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">PHP Deployment</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">Deploying PHP Applications</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            Deploying PHP applications requires careful planning and configuration.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Deployment Options</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Shared Hosting:</strong> Easy setup, limited control</li>
            <li><strong>VPS:</strong> Full control, requires server administration</li>
            <li><strong>Cloud Platforms:</strong> AWS, Google Cloud, Azure</li>
            <li><strong>PaaS:</strong> Heroku, Platform.sh</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Deployment Checklist</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Set proper file permissions</li>
            <li>Configure production php.ini settings</li>
            <li>Disable debug and development tools</li>
            <li>Implement proper caching</li>
            <li>Set up monitoring and logging</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">.htaccess Example</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
</IfModule>

# Security headers
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"

# URL rewriting
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?url=$1 [L,QSA]`}
            </code>
          </pre>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Complete Tutorial
        </button>
      </div>
    </div>
  );
}